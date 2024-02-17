import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // form data
  const signUpData = await request.formData();
  const email = signUpData.get("email");

  // api credentials
  const klaviyoPk = import.meta.env.KLAVIYO_PK;
  const listId = import.meta.env.KLAVIYO_LIST_ID;

  // create profile config
  const createProfileUrl = "https://a.klaviyo.com/api/profiles/";
  const subscribeProfileToList =
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/";

  // request options
  const createProfileOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      revision: "2022-10-17",
      "content-type": "application/json",
      Authorization: `Klaviyo-API-Key ${klaviyoPk}`
    },
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: {
          email
        }
      }
    })
  };

  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields"
      }),
      { status: 400 }
    );
  }

  await fetch(createProfileUrl, createProfileOptions)
    .then((response) => response.json())
    .then((profile) => {
      return fetch(subscribeProfileToList, {
        method: "POST",
        headers: {
          accept: "application/json",
          revision: "2024-02-15",
          "content-type": "application/json",
          Authorization: `Klaviyo-API-Key ${klaviyoPk}`
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              custom_source: "ppc page sign-up",
              profiles: {
                data: [
                  {
                    type: "profile",
                    id: profile.data.id,
                    attributes: {
                      email: profile.data.attributes.email,
                      // phone_number: '+15005550006',
                      subscriptions: {
                        email: {
                          marketing: {
                            consent: "SUBSCRIBED",
                            consented_at: new Date().toISOString()
                          }
                        }
                        // sms: {marketing: {consent: 'SUBSCRIBED', consented_at: '2023-08-23T14:00:00-0400'}}
                      }
                    }
                  }
                ]
              }
            },
            relationships: { list: { data: { type: "list", id: listId } } }
          }
        })
      });
    })
    .catch((error) => console.log(error));

  return new Response(
    JSON.stringify({
      message: "Success, profile created and subscribed to list!"
    }),
    {
      status: 200
    }
  );
};
