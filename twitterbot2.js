const app = new TwitterLite({
  version: '2',
  extension: false,
  bearer_token: process.env.BEARER_TOKEN,
})
const user = new TwitterLite({
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
  consumer_key: process.env.CONS_KEY,
  consumer_secret: process.env.CONS_SECRET,
})

(from:username1 OR from:username2 OR from:username3) -is:reply -is:retweet


{
  start_time: '2021-09-15T03:10:41.161Z',
  max_results: 10,
  'tweet.fields': 'public_metrics',
  expansions: 'author_id',
  'user.fields': 'id,username',
  query: '(from:username1 OR from:username2 OR from:username3) -is:reply -is:retweet'
}



const { meta, data, includes } = await app.get('tweets/search/recent', params)



const { data } = await user.post('statuses/update', { status: status })



const { data } = await user.post('statuses/retweet/' + id)
