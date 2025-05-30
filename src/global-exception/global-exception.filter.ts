import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { MyError } from 'src/types/error';
import { EntityNotFoundError, TypeORMError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: MyError = {
      type: 'InternalServerErrorException',
      message: 'internal server error please try again later',
    };
    if (exception instanceof HttpException) {
      const { error: err, code } = handleHttpError(exception);
      error = err;
      httpStatus = code ?? exception.getStatus();
    } else if (exception instanceof TypeORMError) {
      const { code, error: err }: { code: number; error: MyError } =
        handleDbError(exception);
      error = err;
      httpStatus = code;
    }
    httpAdapter.reply(ctx.getResponse(), error, httpStatus);
  }
}

function handleHttpError(exception: HttpException): {
  error: MyError;
  code?: number;
} {
  const res = exception.getResponse();
  if (
    !!res &&
    typeof res === 'object' &&
    'message' in res &&
    'error' in res &&
    'statusCode' in res &&
    res.message instanceof Array &&
    res.message.every((i) => typeof i === 'string') &&
    typeof res.error === 'string' &&
    typeof res.statusCode === 'number'
  ) {
    console.log(res);
    return {
      error: { type: res.error, message: res.message },
      code: res.statusCode,
    };
  }
  return {
    code: undefined,
    error: { type: exception.name, message: exception.message },
  };
}

function handleDbError(exception: TypeORMError): {
  error: MyError;
  code: number;
} {
  let code: number = HttpStatus.INTERNAL_SERVER_ERROR;
  const error: MyError = {
    type: 'InternalServerErrorException',
    message: 'internal server error please try again later',
  };
  if (exception instanceof EntityNotFoundError) {
    code = HttpStatus.NOT_FOUND;
    error.type = exception.name;
    error.message = 'requested resource is not found';
  }
  return { error, code };
}
