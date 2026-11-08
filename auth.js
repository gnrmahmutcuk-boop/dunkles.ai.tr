// dunkles auth (Supabase). Fill in the two values below.
// The anon key is designed to be public. NEVER put the service_role key here.
(function () {
  const SUPABASE_URL = 'https://rhzcfasxbtrgivxzhpay.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_UDLCgJT9t-0XTXRLlcailw_HprZbLh_';

  const ok = !SUPABASE_URL.startsWith('PASTE') && !!window.supabase;
  const client = ok ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
  const home = () => new URL('index.html', location.href).href;

  window.dunklesAuth = {
    configured: ok,
    client,
    home,
    async session() {
      if (!client) return null;
      const { data } = await client.auth.getSession();
      return data.session;
    },
    oauth(provider) {
      return client.auth.signInWithOAuth({ provider, options: { redirectTo: home() } });
    },
  };
})();
