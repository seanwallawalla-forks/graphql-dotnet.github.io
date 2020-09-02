webpackJsonp([55192516056771],{317:function(a,n){a.exports={data:{markdownRemark:{html:'<h1 id="protection-against-malicious-queries"><a href="#protection-against-malicious-queries" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Protection Against Malicious Queries</h1>\n<p>GraphQL allows the client to bundle and nest many queries into a single request. While this is quite convenient it also makes GraphQL endpoints susceptible to Denial of Service attacks.</p>\n<p>To mitigate this graphql-dotnet provides a few options that can be tweaked to set the upper bound of nesting and complexity of incoming queries so that the endpoint would only try to resolve queries that meet the set criteria and discard any overly complex and possibly malicious query that you don\'t expect your clients to make thus protecting your server resources against depletion by a denial of service attacks.</p>\n<p>These options are added to the <code class="language-text">ExecutionOptions</code> via an instance of <code class="language-text">GraphQL.Validation.Complexity.ComplexityConfiguration</code>. You can leave any of the options null to go with the default value and disable that specific check. The available options are the following:</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ComplexityConfiguration</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> MaxDepth <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> MaxComplexity <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span><span class="token punctuation">?</span></span> FieldImpact <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">await</span> schema<span class="token punctuation">.</span><span class="token function">ExecuteAsync</span><span class="token punctuation">(</span>_ <span class="token operator">=></span>\n<span class="token punctuation">{</span>\n  _<span class="token punctuation">.</span>Query <span class="token operator">=</span> <span class="token string">"..."</span><span class="token punctuation">;</span>\n  _<span class="token punctuation">.</span>ComplexityConfiguration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ComplexityConfiguration</span> <span class="token punctuation">{</span> MaxDepth <span class="token operator">=</span> <span class="token number">15</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><code class="language-text">MaxDepth</code> will enforce the total maximum nesting across all queries in a request. For example the following query will have a query depth of 2. Note that fragments are taken into consideration when making these calculations.</p>\n<div class="gatsby-highlight" data-language="graphql">\n      <pre class="language-graphql"><code class="language-graphql"><span class="token punctuation">{</span>\n  Product <span class="token punctuation">{</span>  <span class="token comment"># This query has a depth of 2 which loosely translates to two distinct queries</span>\n  \t\t\t <span class="token comment"># to the datasource, first one to return the list of products and second</span>\n             <span class="token comment"># one (which will be executed once for each returned product) to grab</span>\n             <span class="token comment"># the product\'s first 3 locations.</span>\n    Title\n    <span class="token operator">...</span><span class="token fragment function">X</span>  <span class="token comment"># The depth of this fragment is calculated first and added to the total.</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fragment</span> <span class="token fragment function">X</span> <span class="token keyword">on</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span> <span class="token comment"># This fragment has a depth of only 1.</span>\n  Location<span class="token punctuation">(</span><span class="token attr-name">first</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    lat\n    long\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>The query depth setting is a good estimation of complexity for most use cases and it loosely translates to the number of unique queries sent to the datastore (however it does not look at how many times each query might get executed). Keep in mind that the calculation of complexity needs to be FAST otherwise it can impose a significant overhead.</p>\n<p>One step further would be specifying <code class="language-text">MaxComplexity</code> and <code class="language-text">FieldImpact</code> to look at the estimated number of entities (or cells in a database) that are expected to be returned by each query. Obviously this depends on the size of your database (i.e. number of records per entity) so you will need to find the average number of records per database entity and input that into <code class="language-text">FieldImpact</code>. For example if I have 3 tables with 100, 120 and 98 rows and I know I will be querying the first table twice as much then a good estimation for <code class="language-text">avgImpact</code> would be 105.</p>\n<p>Note: I highly recommend setting a higher bound on the number of returned entities by each resolve function in your code. if you use this approach already in your code then you can input that upper bound (which would be the maximum possible items returned per entity) as your avgImpact.\nIt is also possible to use a theoretical value for this (for example 2.0) to asses the query\'s impact on a theoretical database hence decoupling this calculation from your actual database.</p>\n<p>Imagine if we had a simple test database for the query in the previous example and we assume an average impact of 2.0 (each entity will return ~2 results) then we can calculate the complexity as following:</p>\n<div class="gatsby-highlight" data-language="math">\n      <pre class="language-math"><code class="language-math">2 Products returned + 2 * (1 * Title per Product) + 2 * [ (3 * Locations) + (3 * lat entries) + (3 * long entries) ] = **22**</code></pre>\n      </div>\n<p>Or simply put on average we will have <strong>2x Products</strong> each will have 1 Title for a total of <strong>2x Titles</strong> plus per each Product entry we will have 3 locations overriden by <code class="language-text">first</code> argument (we follow relay\'s spec for <code class="language-text">first</code>,<code class="language-text">last</code> and <code class="language-text">id</code> arguments) and each of these 3 locations have a lat and a long totalling <strong>6x Locations</strong> having <strong>6x lat</strong>s and <strong>6x longs</strong>.</p>\n<p>Now if we set the <code class="language-text">avgImpact</code> to 2.0 and set the <code class="language-text">MaxComplexity</code> to 23 (or higher) the query will execute correctly. If we change the <code class="language-text">MaxComplexity</code> to something like 20 the DocumentExecutor will fail right after parsing the AST tree and will not attempt to resolve any of the fields (or talk to the database).</p>',fields:{relativePath:"docs/getting-started/malicious-queries.md"}},site:{siteMetadata:{githubEditUrl:"https://github.com/graphql-dotnet/graphql-dotnet/edit/master/docs2/site"}}},pathContext:{relativePath:"docs/getting-started/malicious-queries.md"}}}});
//# sourceMappingURL=path---docs-getting-started-malicious-queries-7b10c1b28de31dd5711d.js.map