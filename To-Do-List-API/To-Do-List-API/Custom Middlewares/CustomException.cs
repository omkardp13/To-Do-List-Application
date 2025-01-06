namespace To_Do_List_API.Custom_Middlewares
{
    public class CustomException : Exception
    {
        public int StatusCode { get; set; }
        public string Details { get; set; }

        public CustomException(string message, int statusCode = 500, string details = null)
            : base(message)
        {
            StatusCode = statusCode;
            Details = details;
        }
    }

}
