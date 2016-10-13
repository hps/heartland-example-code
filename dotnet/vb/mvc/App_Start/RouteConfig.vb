Imports System.Web.Mvc

Public Class RouteConfig


    Public Shared Sub Configure(routes As Web.Routing.RouteCollection)

        routes.MapRoute("Default", "{controller}/{action}/{id}", New With {.controller = "Home", .action = "Index", .id = ""})

    End Sub


End Class
