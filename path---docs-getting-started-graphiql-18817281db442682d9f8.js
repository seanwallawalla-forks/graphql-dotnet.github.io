webpackJsonp([86643674157860],{308:function(a,e){a.exports={data:{markdownRemark:{html:'<h1 id="graphiql"><a href="#graphiql" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>GraphiQL</h1>\n<p><a href="https://github.com/graphql/graphiql">GraphiQL</a> is an interactive in-browser GraphQL IDE.\nThis is a fantastic developer tool to help you form queries and explore your Schema.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/graphiql-f99370acbcc0132743dc6deab374ad2e-e37bc.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 600px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 68.91143911439114%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsSAAALEgHS3X78AAACi0lEQVQ4y62SS28TMRDHF6QKeuSCyJEvwrUfAaHSRH2hlXrkxKEnPga3iiuRyokGpUpy4YJoaBESSkjTR8juZr0Pr73eh9fDrLsbtUckRvrL9nj0m4dtHL59vzI5/bIxvhrtzWeWeT6ZmpPxxLyYXpqOszAd2zGtuW2OR2NcLXOBPsuyzcnvifaNfo3N6flFud/r9wZPjf3Xbx6ffvvKbNeBIAzBIz4QlOd5EMcCRJLgGkMQBMB5DAJ95Zlz9IscsiyHMKCgFMCgP2gZu+arxmw2m1PbBf9qnhHiSEaJ5CySjDFJXCJpSCXjXFI8hzSSFMV4rJUhUSmVAdrw+7BpbGw0G4Hv2QtfwOXMLXKZYa4yH6hc5orYnhpdOmrhhoqX4kKJJFURY8olRKVpGQ9FCTw5OWkaz1+sN8LAtxc0hXMr0BdK8wDbySBgHH78vIbrqQ2RGwKLOLaaAMfWE1xVURZY1MCW8XJ9vWGjlYg8l3ihlkDMDhHOjYzmQEkIMSbg1VxJKMC1/4AIr5XMhQYOhwhsNZsNQogNN1bALcvzHGjEwPYpPlgEnHLgItGPFScpCNzLlKtCphVw2DJ2dnY0UEoJOPgiwexlq6WEEPplXQR6HgXuRct2y2SVLWeogbsItPBjMc4g8IOCc65BNzAO+KoQ4twiFmt4DcwqoLqZz60Kt7cbruveblnVwioVAhW2phCkeL3GQmGFquLdBW5ubj3xfX+uaUWRo2QpjJNpmuq/hoA7qv6fjqmUL79NOcMIDf6DnZ2dbRlra2uPOp3Ou36//7HX631AtUvhud3tdtufjjrtTudz+6hSve8eH+uYOn4wGBweHBw8M9DuoVZQq6iHlVb/QXX8A9T9v7g6oEcMffyuAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="graphiql"\n        title=""\n        src="/static/graphiql-f99370acbcc0132743dc6deab374ad2e-7a630.png"\n        srcset="/static/graphiql-f99370acbcc0132743dc6deab374ad2e-46d37.png 150w,\n/static/graphiql-f99370acbcc0132743dc6deab374ad2e-c218a.png 300w,\n/static/graphiql-f99370acbcc0132743dc6deab374ad2e-7a630.png 600w,\n/static/graphiql-f99370acbcc0132743dc6deab374ad2e-91b84.png 900w,\n/static/graphiql-f99370acbcc0132743dc6deab374ad2e-e37bc.png 1084w"\n        sizes="(max-width: 600px) 100vw, 600px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>The easiest way to add GraphiQL into your ASP.NET Core app is to use the <a href="https://www.nuget.org/packages/GraphQL.Server.Ui.GraphiQL">GraphQL.Server.Ui.GraphiQL</a> package.\nAll you need to do after installing nuget is to append one extra line in your <code class="language-text">Startup.cs</code>:</p>\n<div class="gatsby-highlight" data-language="c#">\n      <pre class="language-c#"><code class="language-c#">public void Configure(IApplicationBuilder app, IHostingEnvironment env)\n{\n    app.UseGraphiQLServer();\n}</code></pre>\n      </div>\n<p>If you do not explicitly specify an endpoints through the optional <code class="language-text">options</code> argument then\nGraphiQL by default will run on <code class="language-text">/graphiql</code> endpoint and will send requests to <code class="language-text">/graphql</code>\nGraphQL API endpoint.</p>\n<p>You may find GraphiQL example in <a href="https://github.com/graphql-dotnet/graphql-dotnet/blob/master/src/GraphQL.Harness/Startup.cs">graphql-dotnet</a> repo.\n<a href="https://github.com/graphql-dotnet/examples/tree/master/src/AspNetCoreCustom">This ASP.NET Core sample project</a> also provides an example of hosting\nthe GraphiQL IDE with a little more effort.</p>',fields:{relativePath:"docs/getting-started/graphiql.md"}},site:{siteMetadata:{githubEditUrl:"https://github.com/graphql-dotnet/graphql-dotnet/edit/master/docs2/site"}}},pathContext:{relativePath:"docs/getting-started/graphiql.md"}}}});
//# sourceMappingURL=path---docs-getting-started-graphiql-18817281db442682d9f8.js.map