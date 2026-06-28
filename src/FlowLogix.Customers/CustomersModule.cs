using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace FlowLogix.Customers;

public static class CustomersModule
{
    public static IServiceCollection AddCustomersModule(
        this IServiceCollection services)
    {
        ArgumentNullException.ThrowIfNull(services);

        return services;
    }

    public static IEndpointRouteBuilder MapCustomersEndpoints(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        return endpoints;
    }
}
