namespace To_Do_List_API.Custom_Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);  // Continue with the request pipeline
            }
            catch (CustomException ex)
            {
                _logger.LogError(ex, "A custom exception occurred.");
                await HandleExceptionAsync(httpContext, ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = exception is CustomException customEx ? customEx.StatusCode : StatusCodes.Status500InternalServerError;

            var response = new
            {
                message = exception.Message,
                details = _env.IsDevelopment() ? exception.StackTrace : null
            };

            return context.Response.WriteAsJsonAsync(response);
        }

    }

}
