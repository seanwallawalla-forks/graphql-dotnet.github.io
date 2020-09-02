webpackJsonp([0x7791409198f1],{310:function(n,a){n.exports={data:{markdownRemark:{html:'<h1 id="field-middleware"><a href="#field-middleware" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Field Middleware</h1>\n<p>Field Middleware is a component connected to the schema, which is embedded into the process of\ncalculating the field value. You can write middleware for fields to provide additional behaviors\nduring field resolution. After connecting the middleware to the schema, it is applied to all\nfields of all schema types. You can connect several middlewares to the schema. In this case,\nthey will be called sequentially along the chain where the previous middleware decides to call\nthe next one. This process is very similar to how middlewares work in the ASP.NET Core HTTP request\npipeline.</p>\n<p>The following example is how Metrics are captured. You write a class that implements <code class="language-text">IFieldMiddleware</code>:</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">InstrumentFieldsMiddleware</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IFieldMiddleware</span></span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">></span></span> <span class="token function">Resolve</span><span class="token punctuation">(</span>\n    <span class="token class-name">IResolveFieldContext</span> context<span class="token punctuation">,</span>\n    <span class="token class-name">FieldMiddlewareDelegate</span> next<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> metadata <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">object</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">{</span>\n      <span class="token punctuation">{</span><span class="token string">"typeName"</span><span class="token punctuation">,</span> context<span class="token punctuation">.</span>ParentType<span class="token punctuation">.</span>Name<span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span><span class="token string">"fieldName"</span><span class="token punctuation">,</span> context<span class="token punctuation">.</span>FieldName<span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">using</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>Metrics<span class="token punctuation">.</span><span class="token function">Subject</span><span class="token punctuation">(</span><span class="token string">"field"</span><span class="token punctuation">,</span> context<span class="token punctuation">.</span>FieldName<span class="token punctuation">,</span> metadata<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Then register your Field Middleware in <code class="language-text">ExecutionOptions</code>.</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">await</span> schema<span class="token punctuation">.</span><span class="token function">ExecuteAsync</span><span class="token punctuation">(</span>options <span class="token operator">=></span>\n<span class="token punctuation">{</span>\n  options<span class="token punctuation">.</span>Query <span class="token operator">=</span> <span class="token string">"..."</span><span class="token punctuation">;</span>\n  options<span class="token punctuation">.</span>FieldMiddleware<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Use</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>InstrumentFieldsMiddleware<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Or, you can register a middleware delegate directly:</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp">_<span class="token punctuation">.</span>FieldMiddleware<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token punctuation">(</span>schema<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=></span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">return</span> context <span class="token operator">=></span>\n  <span class="token punctuation">{</span>\n    <span class="token comment">// your code here</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token function">next</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// your code here</span>\n    <span class="token keyword">return</span> result<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>The middleware interface is defined as:</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IFieldMiddleware</span>\n<span class="token punctuation">{</span>\n  <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">></span></span> <span class="token function">Resolve</span><span class="token punctuation">(</span><span class="token class-name">IResolveFieldContext</span> context<span class="token punctuation">,</span> <span class="token class-name">FieldMiddlewareDelegate</span> next<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>The middleware delegate is defined as:</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">></span></span> <span class="token function">FieldMiddlewareDelegate</span><span class="token punctuation">(</span><span class="token class-name">IResolveFieldContext</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="field-middleware-and-dependency-injection"><a href="#field-middleware-and-dependency-injection" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Field Middleware and Dependency Injection</h2>\n<p>First, you are advised to read the article about <a href="Dependency-Injection">Dependency Injection</a>.</p>\n<p>If you use <code class="language-text">IFieldMiddlewareBuilder.Use</code> overloads which accept type parameter (that is,\nthose that do not accept a <code class="language-text">IFieldMiddleware</code> instance or a middleware delegate) then your\nmiddleware creation will be delegated to DI-container. Thus, you can pass any dependencies to\nthe Field Middleware constructor, provided that you have registered them correctly in DI.\nNote that it is required to have a schema that inherits from <code class="language-text">Schema</code> or implements <code class="language-text">IServiceProvider</code>.</p>\n<p>Also, the middleware itself should be registered in DI:</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp">services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddSingleton</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>InstrumentFieldsMiddleware<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="known-issues"><a href="#known-issues" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Known issues</h2>\n<p>Perhaps the most important thing with Field Middlewares that you should be aware of is that the\ndefault <code class="language-text">DocumentExecuter</code> applies middlewares to the schema only once while the schema is being\ninitialized. After this, calling any <code class="language-text">IFieldMiddlewareBuilder.Use</code> methods has no effect.</p>\n<p>Field Middleware, when applying to the schema, <strong>modifies</strong> the resolver of each field. Therefore,\nyou should be careful when using different lifetimes (singleton, scoped, transient) for your\nGraphTypes, Schema and Field Middleware. You <strong>can</strong> use any of lifetime, but for example in\ncase of using singleton lifetime for some GraphType and scoped lifetime for Field Middleware\nand Schema this will cause the middleware to be applied to the same fields multiple times.\nIn the case of ASP.NET Core app the resolvers of these fields will be wrapped again on each\nHTTP request to the server.</p>\n<p>General recommendations for lifetimes are:</p>\n<table>\n<thead>\n<tr>\n<th>Schema</th>\n<th>Graph Type</th>\n<th>Middleware</th>\n<th>Rating</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>singleton</td>\n<td>singleton</td>\n<td>singleton</td>\n<td>the safest and the most performant option recommended by default</td>\n</tr>\n<tr>\n<td>scoped</td>\n<td>scoped</td>\n<td>singleton</td>\n<td>much less performant option</td>\n</tr>\n<tr>\n<td>scoped</td>\n<td>scoped</td>\n<td>scoped</td>\n<td>the least performant option</td>\n</tr>\n<tr>\n<td>scoped</td>\n<td>singleton</td>\n<td>scoped</td>\n<td>DO NOT DO THAT! Explanation above.</td>\n</tr>\n<tr>\n<td>singleton</td>\n<td>singleton</td>\n<td>scoped</td>\n<td>DO NOT DO THAT! InvalidOperationException: Cannot resolve scoped service from root provider</td>\n</tr>\n</tbody>\n</table>\n<p>If your Field Middleware has scoped dependencies but your Schema and Graph Types are singletons\n(which is recommended for them) you can make Field Middleware singleton too and obtain the necessary\ndependencies right in the <code class="language-text">Resolve</code> method. Here is an example of such an approach:</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyFieldMiddleware</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IFieldMiddleware</span></span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IHttpContextAccessor</span> _accessor<span class="token punctuation">;</span>\n  <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IMySingletonService</span> _service<span class="token punctuation">;</span>\n\n  <span class="token keyword">public</span> <span class="token function">MyFieldMiddleware</span><span class="token punctuation">(</span><span class="token class-name">IHttpContextAccessor</span> accessor<span class="token punctuation">,</span> <span class="token class-name">IMySingletonService</span> service<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    _accessor <span class="token operator">=</span> accessor<span class="token punctuation">;</span>\n    _service <span class="token operator">=</span> service<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">public</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">></span></span> <span class="token function">Resolve</span><span class="token punctuation">(</span><span class="token class-name">IResolveFieldContext</span> context<span class="token punctuation">,</span> <span class="token class-name">FieldMiddlewareDelegate</span> next<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> scopedDependency1 <span class="token operator">=</span> accessor<span class="token punctuation">.</span>HttpContext<span class="token punctuation">.</span>RequestServices<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IMyService1<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> scopedDependency2 <span class="token operator">=</span> accessor<span class="token punctuation">.</span>HttpContext<span class="token punctuation">.</span>RequestServices<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IMyService2<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token range operator">..</span><span class="token punctuation">.</span>\n    <span class="token keyword">return</span> <span class="token function">next</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Options are also possible using transient lifetime, but are not given here (not recommended).</p>\n<h2 id="field-middleware-vs-directive"><a href="#field-middleware-vs-directive" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Field Middleware vs Directive</h2>\n<p>If we consider Field Middleware as a way to globally affect the method of calculating all fields\nof all types in the Schema, then the directive can be considered as a way to locally affect only\nspecific fields. The mechanism of their work is similar. For more information about directives\nsee <a href="Directives">Directives</a>.</p>',fields:{relativePath:"docs/getting-started/field-middleware.md"}},site:{siteMetadata:{githubEditUrl:"https://github.com/graphql-dotnet/graphql-dotnet/edit/master/docs2/site"}}},pathContext:{relativePath:"docs/getting-started/field-middleware.md"}}}});
//# sourceMappingURL=path---docs-getting-started-field-middleware-0bb961a910e1b32bb8c4.js.map