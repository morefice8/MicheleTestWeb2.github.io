document.addEventListener("DOMContentLoaded", () => {
    const instagramFeed = document.getElementById("instagram-feed");

    async function caricaPostInstagram() {
        const token = "IL_TUO_ACCESS_TOKEN"; // Sostituisci con il tuo token valido
        const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${token}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Errore API Instagram: ${response.status}`);
            }

            const data = await response.json();
            const posts = data.data;

            // Genera l'HTML per ciascun post
            instagramFeed.innerHTML = posts.map((post) => {
                if (post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM") {
                    return `
                        <div class="instagram-post">
                            <a href="${post.permalink}" target="_blank">
                                <img src="${post.media_url}" alt="${post.caption || "Post Instagram"}">
                            </a>
                        </div>
                    `;
                } else if (post.media_type === "VIDEO") {
                    return `
                        <div class="instagram-post">
                            <a href="${post.permalink}" target="_blank">
                                <video controls>
                                    <source src="${post.media_url}" type="video/mp4">
                                </video>
                            </a>
                        </div>
                    `;
                }
                return "";
            }).join("");
        } catch (error) {
            console.error("Errore nel caricamento dei post Instagram:", error);
            instagramFeed.innerHTML = "<p>Impossibile caricare i post al momento.</p>";
        }
    }

    caricaPostInstagram();
});
