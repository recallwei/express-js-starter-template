import createError from 'http-errors'
import express from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes'
import usersRouter from './routes/users'

const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middleware setup
app.use(logger('dev')) // 日志
app.use(express.json()) // 解析json
app.use(express.urlencoded({ extended: false })) // 解码
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'))) // 静态资源目录

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
