webpackJsonp([0xf72b164ccf51],{291:function(n,s){n.exports={data:{markdownRemark:{html:'<h1 id="authorization"><a href="#authorization" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Authorization</h1>\n<p>See the <a href="https://github.com/graphql-dotnet/authorization">Authorization</a> project for a more in depth implemenation of the following idea.</p>\n<p>You can write validation rules that will run before a query is executed.  You can use this pattern to check that the user is authenticated or has permissions for a specific field.  This example uses the <code class="language-text">Metadata</code> dictionary available on Fields to set permissons per field.</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyGraphType</span> <span class="token punctuation">:</span> <span class="token class-name">ObjectGraphType</span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token function">MyGraphType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">RequirePermission</span><span class="token punctuation">(</span><span class="token string">"READ_ONLY"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">Field</span><span class="token punctuation">(</span>x <span class="token operator">=</span><span class="token operator">></span> x<span class="token punctuation">.</span>Secret<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">RequirePermission</span><span class="token punctuation">(</span><span class="token string">"Admin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2 id="validation-rule"><a href="#validation-rule" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Validation Rule</h2>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RequiresAuthValidationRule</span> <span class="token punctuation">:</span> <span class="token class-name">IValidationRule</span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token class-name">INodeVisitor</span> <span class="token function">Validate</span><span class="token punctuation">(</span><span class="token class-name">ValidationContext</span> context<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> userContext <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token class-name">UserContext</span> <span class="token keyword">as</span> GraphQLUserContext<span class="token punctuation">;</span>\n    <span class="token keyword">var</span> authenticated <span class="token operator">=</span> userContext<span class="token punctuation">.</span>User<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">IsAuthenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span><span class="token operator">?</span> <span class="token keyword">false</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">EnterLeaveListener</span><span class="token punctuation">(</span>_ <span class="token operator">=</span><span class="token operator">></span>\n    <span class="token punctuation">{</span>\n      _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Match</span><span class="token punctuation">&lt;</span><span class="token class-name">Operation</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>op <span class="token operator">=</span><span class="token operator">></span>\n      <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>op<span class="token punctuation">.</span>OperationType <span class="token operator">==</span> OperationType<span class="token punctuation">.</span>Mutation <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>authenticated<span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n          context<span class="token punctuation">.</span><span class="token function">ReportError</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ValidationError</span><span class="token punctuation">(</span>\n              context<span class="token punctuation">.</span>OriginalQuery<span class="token punctuation">,</span>\n              <span class="token string">"auth-required"</span><span class="token punctuation">,</span>\n              $<span class="token string">"Authorization is required to access {op.Name}."</span><span class="token punctuation">,</span>\n              op<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n      <span class="token comment">// this could leak info about hidden fields in error messages</span>\n      <span class="token comment">// it would be better to implement a filter on the schema so it</span>\n      <span class="token comment">// acts as if they just don\'t exist vs. an auth denied error</span>\n      <span class="token comment">// - filtering the schema is not currently supported</span>\n      _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Match</span><span class="token punctuation">&lt;</span><span class="token class-name">Field</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>fieldAst <span class="token operator">=</span><span class="token operator">></span>\n      <span class="token punctuation">{</span>\n        <span class="token keyword">var</span> fieldDef <span class="token operator">=</span> context<span class="token punctuation">.</span>TypeInfo<span class="token punctuation">.</span><span class="token function">GetFieldDef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>fieldDef<span class="token punctuation">.</span><span class="token function">RequiresPermissions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>\n            <span class="token punctuation">(</span><span class="token operator">!</span>authenticated <span class="token operator">||</span> <span class="token operator">!</span>fieldDef<span class="token punctuation">.</span><span class="token function">CanAccess</span><span class="token punctuation">(</span>userContext<span class="token punctuation">.</span>User<span class="token punctuation">.</span>Claims<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n          context<span class="token punctuation">.</span><span class="token function">ReportError</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ValidationError</span><span class="token punctuation">(</span>\n              context<span class="token punctuation">.</span>OriginalQuery<span class="token punctuation">,</span>\n              <span class="token string">"auth-required"</span><span class="token punctuation">,</span>\n              $<span class="token string">"You are not authorized to run this query."</span><span class="token punctuation">,</span>\n              fieldAst<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2 id="permission-extension-methods"><a href="#permission-extension-methods" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Permission Extension Methods</h2>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">GraphQLExtensions</span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token keyword">string</span> PermissionsKey <span class="token operator">=</span> <span class="token string">"Permissions"</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">bool</span> <span class="token function">RequiresPermissions</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">IProvideMetadata</span> type<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> permissions <span class="token operator">=</span> type<span class="token punctuation">.</span>GetMetadata<span class="token operator">&lt;</span>IEnumerable<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token operator">></span><span class="token operator">></span><span class="token punctuation">(</span>PermissionsKey<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token generic-method"><span class="token function">List</span><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> permissions<span class="token punctuation">.</span><span class="token function">Any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">bool</span> <span class="token function">CanAccess</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">IProvideMetadata</span> type<span class="token punctuation">,</span> IEnumerable<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token operator">></span> claims<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> permissions <span class="token operator">=</span> type<span class="token punctuation">.</span>GetMetadata<span class="token operator">&lt;</span>IEnumerable<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token operator">></span><span class="token operator">></span><span class="token punctuation">(</span>PermissionsKey<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token generic-method"><span class="token function">List</span><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> permissions<span class="token punctuation">.</span><span class="token function">All</span><span class="token punctuation">(</span>x <span class="token operator">=</span><span class="token operator">></span> claims<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token operator">?</span><span class="token operator">?</span> <span class="token keyword">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">bool</span> <span class="token function">HasPermission</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">IProvideMetadata</span> type<span class="token punctuation">,</span> <span class="token keyword">string</span> permission<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> permissions <span class="token operator">=</span> type<span class="token punctuation">.</span>GetMetadata<span class="token operator">&lt;</span>IEnumerable<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token operator">></span><span class="token operator">></span><span class="token punctuation">(</span>PermissionsKey<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token generic-method"><span class="token function">List</span><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> permissions<span class="token punctuation">.</span><span class="token function">Any</span><span class="token punctuation">(</span>x <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> permission<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">RequirePermission</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">IProvideMetadata</span> type<span class="token punctuation">,</span> <span class="token keyword">string</span> permission<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> permissions <span class="token operator">=</span> type<span class="token punctuation">.</span>GetMetadata<span class="token operator">&lt;</span>List<span class="token operator">&lt;</span><span class="token keyword">string</span><span class="token operator">></span><span class="token operator">></span><span class="token punctuation">(</span>PermissionsKey<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>permissions <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n      permissions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token generic-method"><span class="token function">List</span><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      type<span class="token punctuation">.</span>Metadata<span class="token punctuation">[</span><span class="token class-name">PermissionsKey</span><span class="token punctuation">]</span> <span class="token operator">=</span> permissions<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    permissions<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>permission<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">public</span> <span class="token keyword">static</span> FieldBuilder<span class="token operator">&lt;</span>TSourceType<span class="token punctuation">,</span> TReturnType<span class="token operator">></span> <span class="token generic-method"><span class="token function">RequirePermission</span><span class="token punctuation">&lt;</span><span class="token class-name">TSourceType</span><span class="token punctuation">,</span> <span class="token class-name">TReturnType</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>\n      <span class="token keyword">this</span> FieldBuilder<span class="token operator">&lt;</span>TSourceType<span class="token punctuation">,</span> TReturnType<span class="token operator">></span> builder<span class="token punctuation">,</span> <span class="token keyword">string</span> permission<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    builder<span class="token punctuation">.</span>FieldType<span class="token punctuation">.</span><span class="token function">RequirePermission</span><span class="token punctuation">(</span>permission<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> builder<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>'}},pathContext:{relativePath:"docs/getting-started/authorization.md"}}}});
//# sourceMappingURL=path---docs-getting-started-authorization-fa6024038f644abaa923.js.map