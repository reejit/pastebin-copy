# What is "pastebin-copy"?
I didn't really have an official name idea for it and it was just a test project.
It is like pastebin but only contains few things:
- Create API Tokens
- Create (raw) Page
- Delete (raw) Page
If you want to use this for a project, I highly recommend editing it, because for example the api token is not in the paste name and there is no rate limits.

# How do I make a token?
## Editing the default config.json
The default token is "admin" and has permission to make api tokens.
```json
{
  "admintoken": "admin",
  "token": "admin"
}
```
You can replace "admin" with your own admin token.
## Manually editing config.json
You can also manually make multiple API tokens using
```json
{
  "admintoken": "admin%2Canotheradmintoken",
  "token": "tokenname%2Canothertokenname%2Ctest"
}
```
You use "%2C" to sperate the variables. You might want to check out [w3schools](https://www.w3schools.com/tags/ref_urlencode.ASP).

## Using the API
If you already have an admin API code, you can use the API to make tokens. 

You can use a GET request (or go to it in your browser) to go to `YOURWEBSITE.URL/createtoken?token=ADMINAPICODE&newtoken=NEWTOKENBEINGCREATEDNAME`.

Replace `YOURWEBSITE.URL` to your website url.

Replace `ADMINAPICODE` to your admin api code. If the token does not exist or it is not an admin api code, it will give off an error message.

Replace `NEWTOKENBEINGCREATEDNAME` to your new token name. There will be an error if you try to make an already existing API code.

Missing any of these variables will cause an error.

# Create Paste/File
Anyone with an API can use this. If you are using the default settings, be careful who you give your paste url to (because the path shows the API code name) and there are no rate limits.

You can use a GET request (or go to it in your browser) to go to `YOURWEBSITE.URL/createtoken?token=TOKENCODE&pasteid=PASTEIDCODE&message=ENTERMESSAGEHERE`.

Replace `YOURWEBSITE.URL` to your website url.

Replace `TOKENCODE` to your token.

Replace `PASTEIDCODE` to the paste id you want it to have.

Replace `ENTERMESSAGEHERE` with the message you want your paste to contain.

If the paste id already exists, it will overwrite the current one.

If you put an invalid/no token, an error will occur.

Missing any of these variables will cause an error.

If you successfully make a paste, you can go to `YOURWEBSITE.URL/pastes/TOKENCODE/PASTEIDCODE`.

If the paste is invalid, it will show nothing.

# Delete Paste/File
Anyone with an API can use this. If you are using the default settings, be careful who you give your paste url to (because the path shows the API code name) and there are no rate limits.

You can use a GET request (or go to it in your browser) to go to `YOURWEBSITE.URL/deletefile?token=TOKENCODE&pasteid=PASTEIDCODE`.

Replace `YOURWEBSITE.URL` to your website url.

Replace `TOKENCODE` to your token. A invalid token will give a error message.

Replace `PASTEIDCODE` to the paste id you want to delete. A non-existing paste will give an error message.

Missing any of these variables will cause an error.

If you successfully delete a paste, `YOURWEBSITE.URL/pastes/TOKENCODE/PASTEIDCODE` should now be empty.
