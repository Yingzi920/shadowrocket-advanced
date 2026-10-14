# Moon fusion notes — experimental
## Enabled-by-update
- Moon Privacy Lite v2.1: 18 narrowly scoped third-party ad-domain rejects, no MITM.
- Original v2.0 can be restored using GitHub commit 98a8b84f6b3a47b87337e4116a17b295157ddea0.
## Opt-in only
- Moon App Clean Lab v0.1: experimental Xianyu splash-ad URL match, NOT included in Privacy Lite.
- Upstream reference: https://github.com/skernelx/SurgeScripts/blob/main/xianyu/xianyu-ad-block.sgmodule
- Endpoint pattern derived from upstream: mtop.taobao.idlecommerce.splash.async.ads
- The HTTPS URL rewrite requires appropriate narrowly scoped MITM configuration to inspect paths; this module does not enable MITM or install a certificate.
- Do not enable global MITM, do not broadly reject acs.m.goofish.com or acs.m.taobao.com.
- App versions may change endpoints; blocking splash API may not remove locally cached ads and may break startup. Disable the experiment immediately if startup/login/product/chat/payment fails.
## Integration approach
- Keep stable AI, DNS, Apple routing and original HTTP rewrite modules unchanged.
- Review third-party source code and license before redistributing any third-party scripts. No third-party JS copied.
- Promote experimental rules only after real device testing and log verification.
