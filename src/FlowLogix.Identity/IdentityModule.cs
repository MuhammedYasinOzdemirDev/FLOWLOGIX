using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace FlowLogix.Identity;

public static class IdentityModule
{
    public static IServiceCollection AddIdentityModule(
        this IServiceCollection services)
    {
        ArgumentNullException.ThrowIfNull(services);

        return services;
    }

    public static IEndpointRouteBuilder MapIdentityEndpoints(
        this IEndpointRouteBuilder endpoints)
    {
        ArgumentNullException.ThrowIfNull(endpoints);

        return endpoints;
    }
}
