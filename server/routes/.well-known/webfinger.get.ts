export default defineEventHandler(() => {
    const email = "contact@cpluspatch.com";
    const issuer = "https://id.cpluspatch.com/realms/default";
    const avatar = "https://cpluspatch.com/images/avatars/jessew.png";

    return {
        subject: `acct:${email}`,
        links: [
            {
                rel: "http://openid.net/specs/connect/1.0/issuer",
                href: issuer,
            },
            {
                rel: "avatar",
                type: "image/png",
                href: avatar,
            },
        ],
    };
});
