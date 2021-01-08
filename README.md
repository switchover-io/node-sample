# Switchover Node Sample

Sample showing how to use Switchover with Node/ExpressJS. This sample shows how to unlock a feature (in the sample a teaser) based on user conditions. 

## Installation

```bash
npm install
```

## Configuration

1. Copy the file `env.sample` to `.env`.

2. Create (if not already done) a toggle in the Switchover web app.

3. Edit the `.env` file according to your values (key and name of you flag):
```bash
SDK_KEY=<INSERT YOUT SDK KEY>
TOGGLE_NAME=<INSERT YOUR FLAG NAME>
```

4. Add a condition to your toggle: `userId matches jack@example.com` 
![Add condition screenshot](/doc/add_condition.png)

5. Save :)

6. Set the toggle to `ACTIVE` and publish it

## Run

Start the express server:

```bash
npm run dev
```

## Login

You can login with two test users:
- Username: `jack`, password: `secret`
- Username: `john`, password: `birthday`

## How it works

Have a look in `routes/index.js`. There is the code where the client will be initialized. 

```javascript
const client = Switchover.createClient(SKDKEY, { ttl: 10 }, 'debug');
``` 

In this example the client has a TTL of 10 seconds. So this means that the flags are cached for 10 sec. before it will be renewd. 

Getting the actual flag is done in the `GET /profile` route: 

```javascript
async (req, res) => {
  await client.fetchAsync();

  const betaFeature = client.toggleValue(TOGGLENAME, false, {
    userId: req.user.email
  });

  //render the page
}
``` 
The toggle will be evaluated with a context (`userId`) and will return it's value (`true`) when the condition will be fullfilled. So in our case the return value will be true wenn the email matches jack@example.com.



## Where to find the SDK Key?

Go to your environment (e.g. development) and copy your SDK-Key:

![Switchover SDK Key](/doc/copy_sdk_key.jpg)







