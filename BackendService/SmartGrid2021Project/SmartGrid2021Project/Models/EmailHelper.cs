using Microsoft.AspNetCore.Identity.UI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class EmailHelper : IEmailSender
    {
       

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            SmtpClient client = new SmtpClient();
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("smartgrid842@gmail.com", "smartgrid2021");
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            client.EnableSsl = true;
            

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("smartgrid842@gmail.com");
            mailMessage.To.Add(new MailAddress(email));

            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = htmlMessage;

            try
            {
                await client.SendMailAsync(mailMessage);
            }
            catch(Exception e)
            {

            }
        }
    }
}
