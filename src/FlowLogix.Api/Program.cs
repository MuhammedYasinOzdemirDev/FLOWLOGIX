using FlowLogix.Customers;
using FlowLogix.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();

builder.Services.AddIdentityModule();
builder.Services.AddCustomersModule();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapIdentityEndpoints();
app.MapCustomersEndpoints();

app.Run();

public partial class Program;
