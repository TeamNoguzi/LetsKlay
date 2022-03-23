export default (req, res, next) => {
    if(req.cookies.user)
        return next('route')
    else {
        res.header('Content-Security-Policy', "script-src 'nonce-sV2iuiAYOQj8JZfadC1gInhyWX5W62j1QYaMS8V9a8c'")
        return res.send(
            `<!DOCTYPE html>
            <html>
                <head></head>
                <body>
                    <button type="submit" id="verify">verify</button>
            
                    <div>
                        <input id="email"/>
                        <button type="submit" id="register">register</button>
                    </div>
                    <script nonce="sV2iuiAYOQj8JZfadC1gInhyWX5W62j1QYaMS8V9a8c">
                        const btn = document.getElementById('verify');
                        const regBtn = document.getElementById('register');
                        const emailInput = document.getElementById('email');
                        btn.addEventListener('click', async () => {
                            const provider = window.klaytn;
                            await provider.enable();
                            console.log(window.caver);
                            const addr = provider.selectedAddress;
                            const sign = await window.caver.klay.sign('test', addr);
                            console.log(sign);
                            try {
                                const res = await fetch('http://localhost:3000/login', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        address:addr,
                                        sign:sign
                                    })
                                });
                                console.log(res.json);
                                window.document.location.reload();
                            }
                            catch {
                                console.log(err);
                            }
                        })
            
                        regBtn.addEventListener('click', async () => {
                            const provider = window.klaytn;
                            await provider.enable();
                            console.log(window.caver);
                            const addr = provider.selectedAddress;
                            const sign = await window.caver.klay.sign('test', addr);
                            const email = emailInput.value;
                            console.log(sign);
                            try {
                                const res = await fetch('http://localhost:3000/register', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        address:addr,
                                        sign:sign,
                                        email:email
                                    })
                                });
                                console.log(res.json);
                            }
                            catch {
                                console.log(err);
                            }
                        })
                    </script>
                </body>
            </html>`
        );
    }
}
