webpackJsonp([0x6802da96b8c4],{320:function(n,a){n.exports={data:{markdownRemark:{html:'<h1 id="mutations"><a href="#mutations" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Mutations</h1>\n<p>To perform a mutation you need to have a root Mutation object that is an <code class="language-text">ObjectGraphType</code>.  Mutations make modifications to data and return a result.  You can only have a single root Mutation object.  Mutations are executed serially.</p>\n<blockquote>\n<p>See the <a href="http://graphql.org/learn/queries/#mutations">official GraphQL documentation on mutations</a>.</p>\n</blockquote>\n<p>Instead of using the <code class="language-text">query</code> keyword, you are required to use <code class="language-text">mutation</code>.  Similar to a <code class="language-text">query</code>, you can omit the <code class="language-text">Operation</code> name if there is only a single operation in the request.</p>\n<div class="gatsby-highlight" data-language="graphql">\n      <pre class="language-graphql"><code class="language-graphql"><span class="token keyword">mutation</span> <span class="token punctuation">(</span><span class="token variable">$human</span><span class="token punctuation">:</span>HumanInput<span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  createHuman<span class="token punctuation">(</span><span class="token attr-name">human</span><span class="token punctuation">:</span> <span class="token variable">$human</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    id\n    name\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>The JSON request for this mutation would look like:</p>\n<div class="gatsby-highlight" data-language="json">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n  <span class="token property">"query"</span><span class="token operator">:</span> <span class="token string">"mutation ($human:HumanInput!){ createHuman(human: $human) { id name } }"</span><span class="token punctuation">,</span>\n  <span class="token property">"variables"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"human"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Boba Fett"</span><span class="token punctuation">,</span>\n      <span class="token property">"homePlanet"</span><span class="token operator">:</span> <span class="token string">"Kamino"</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>C# class would look like:</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Human</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> HomePlanet <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Set the <code class="language-text">Mutation</code> property on your <code class="language-text">Schema</code>.</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StarWarsSchema</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Schema</span></span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token function">StarWarsSchema</span><span class="token punctuation">(</span><span class="token class-name">IServiceProvider</span> provider<span class="token punctuation">)</span>\n    <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>provider<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    Query <span class="token operator">=</span> resolver<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>StarWarsQuery<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    Mutation <span class="token operator">=</span> resolver<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>StarWarsMutation<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>A <code class="language-text">mutation</code> <code class="language-text">GraphType</code> looks identical to a <code class="language-text">query</code> <code class="language-text">GraphType</code>.  The difference is you are allowed to mutate data.</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StarWarsMutation</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ObjectGraphType</span></span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token function">StarWarsMutation</span><span class="token punctuation">(</span><span class="token class-name">StarWarsData</span> data<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token generic-method"><span class="token function">Field</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>HumanType<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>\n      <span class="token string">"createHuman"</span><span class="token punctuation">,</span>\n      <span class="token named-parameter punctuation">arguments</span><span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">QueryArguments</span><span class="token punctuation">(</span>\n        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">QueryArgument<span class="token punctuation">&lt;</span>NonNullGraphType<span class="token punctuation">&lt;</span>HumanInputType<span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>Name <span class="token operator">=</span> <span class="token string">"human"</span><span class="token punctuation">}</span>\n      <span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token named-parameter punctuation">resolve</span><span class="token punctuation">:</span> context <span class="token operator">=></span>\n      <span class="token punctuation">{</span>\n        <span class="token class-name"><span class="token keyword">var</span></span> human <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetArgument</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Human<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token string">"human"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> data<span class="token punctuation">.</span><span class="token function">AddHuman</span><span class="token punctuation">(</span>human<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>To provide a set of input values you must use <code class="language-text">InputObjectGraphType</code>.</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HumanInputType</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">InputObjectGraphType</span></span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">public</span> <span class="token function">HumanInputType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    Name <span class="token operator">=</span> <span class="token string">"HumanInput"</span><span class="token punctuation">;</span>\n    <span class="token generic-method"><span class="token function">Field</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>NonNullGraphType<span class="token punctuation">&lt;</span>StringGraphType<span class="token punctuation">></span><span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token generic-method"><span class="token function">Field</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>StringGraphType<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token string">"homePlanet"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><code class="language-text">StarWarsData</code> is an in-memory data store.</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StarWarsData</span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">private</span> <span class="token class-name">List<span class="token punctuation">&lt;</span>Human<span class="token punctuation">></span></span> _humans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>Human<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">public</span> <span class="token return-type class-name">Human</span> <span class="token function">AddHuman</span><span class="token punctuation">(</span><span class="token class-name">Human</span> human<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    human<span class="token punctuation">.</span>Id <span class="token operator">=</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    _humans<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>human<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> human<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<blockquote>\n<p>See the <a href="https://github.com/graphql-dotnet/examples/tree/master/src/StarWars">StarWars example</a> for a full implementation.</p>\n</blockquote>',fields:{relativePath:"docs/getting-started/mutations.md"}},site:{siteMetadata:{githubEditUrl:"https://github.com/graphql-dotnet/graphql-dotnet/edit/master/docs2/site"}}},pathContext:{relativePath:"docs/getting-started/mutations.md"}}}});
//# sourceMappingURL=path---docs-getting-started-mutations-31d122d1963e5c1566e1.js.map