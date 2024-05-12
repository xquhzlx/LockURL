//eC5yaXAgb24gRGlzY29yZA==
//discord.gg/k3s 👑
async function _aq() {
   console.clear()
   let _a = {};
   let _i = 1;
   //eC5yaXAgb24gRGlzY29yZA==
   while (_i <= 3) {
      switch (_i) {
         case 1:
            _a.token = await _q(`Token ? `);
            const _ud = await fetch(`https://discord.com/api/v9/users/@me`, {
               headers: {
                  Authorization: `${_a.token}`
               }
            });
            if (_ud.ok) {
               const __ud = await _ud.json();
               _a.name = __ud.username;
            } else {
               console.clear();
               _le("INVALID", _a.token);
               process.exit();
            }
            break;
         case 2:
            _a.guild = await _q(`Guild ID ? `);
            const _fg = await fetch(`https://discord.com/api/v9/guilds/${_a.guild}`, {
               headers: {
                  Authorization: `${_a.token}`
               }
            });
            if (!_fg.ok) {
               console.clear();
               _le("INVALID", _a.guild);
               process.exit();
            }
            break;
         case 3:
            _a.vanity = await _q(`Vanity URL ? `);
            break;
      }
      _i++;
   }
   console.clear()
   _l("TOKEN", _a.token.replace(/^(.*?)\..*$/, (_, _m) => _m + 'x'.repeat(_a.token.length - _m.length)));
   _l("USER", _a.name);
   _l("GUILD", _a.guild);
   _l("VANITY", _a.vanity);
   _s(_a.guild, _a.vanity, _a.token);
}

//eC5yaXAgb24gRGlzY29yZA==

function _q(__q) {
   return new Promise((_r) => {
      process.stdout.write(__q);
      process.stdin.once('data', function (_d) {
         const _i = _d.toString().trim();
         _r(_i);
      });
   });
}

function _l(_l, _n) {
   console.log(`\x1b[90m${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} \x1b[32m[${_l}]\x1b[90m - \x1b[36m${_n}\x1b[0m`);
}
//eC5yaXAgb24gRGlzY29yZA==
function _le(_l, _n) {
   console.log(`\x1b[90m${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} \x1b[31m[${_l}]\x1b[90m - \x1b[36m${_n}\x1b[0m`);
}

async function _s(_g, _v, _t) {
   let _a = 0;

   while (true) {
      _a++;

      const _re = await fetch(`https://discord.com/api/v9/guilds/${_g}/vanity-url`, {
         method: 'PATCH',
         headers: {
            Authorization: `${_t}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            code: _v
         })
      });

      if (_re.ok) {
         continue;
      }

      if (_re.status === 429) {
         const _ra = parseInt(_re.headers.get('Retry-After'), 10);
         if (!isNaN(_ra)) {
            const _h = Math.floor(_ra / 3600);
            const _rs = _ra % 3600;
            const _m = Math.floor(_rs / 60);

            _le("RATELIMIT", `Rate limited the vanity ${_v} for ${_h} hours and ${_m} minutes. (${_a - 1})`);
            _le("RATELIMIT", `Retrying in ${_h} hours and ${_m} minutes...`);
            _a = 0;
            await new Promise(resolve => setTimeout(resolve, _ra * 1000));
            continue;
         } else {
            return;
         }
      }

      _le("VANITY", `[+] Failed to set Vanity URL (${_re.statusText})`);
      process.exit(1);
   }
}

_aq();

//eC5yaXAgb24gRGlzY29yZA==
