/* =========================================
   WAY2GO - SUPABASE CONFIGURATION
========================================= */

const SUPABASE_URL =
"https://cokscjaojvhecqjsvnsz.supabase.co";

const SUPABASE_KEY =
"sb_publishable_Ws5cJFzTk853Dt0chh0_Ew_bKRT33gJ";

const supabaseClient =
window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

/* =========================================
   AUTHENTICATION
========================================= */

async function register() {

  const name =
    document.getElementById("registerName")?.value.trim();

  const email =
    document.getElementById("registerEmail")?.value.trim();

  const password =
    document.getElementById("registerPassword")?.value;

  if (!name || !email || !password) {

    alert("Please fill in all fields.");

    return;
  }

  const { data, error } =
    await supabaseClient.auth.signUp({

      email,

      password,

      options: {

        data: {

          full_name: name

        }

      }

    });

  if (error) {

    alert(error.message);

    return;
  }

  if (data.user) {

    alert(
      "Account created successfully."
    );

    window.location.href =
      "dashboard.html";
  }

}

async function login() {

  const email =
    document.getElementById("loginEmail")?.value.trim();

  const password =
    document.getElementById("loginPassword")?.value;

  const { data, error } =
    await supabaseClient
      .auth
      .signInWithPassword({

        email,

        password

      });

  if (error) {

    alert(error.message);

    return;
  }

  if (data.session) {

    window.location.href =
      "dashboard.html";
  }

}

async function logout() {

  await supabaseClient
    .auth
    .signOut();

  window.location.href =
    "index.html";
}

/* =========================================
   SESSION
========================================= */

async function checkSession() {

  const { data } =
    await supabaseClient
      .auth
      .getSession();

  return data.session;

}

async function protectDashboard() {

  const session =
    await checkSession();

  if (!session) {

    window.location.href =
      "index.html";

    return;
  }

  loadProfile();

}

async function loadProfile() {

  const { data } =
    await supabaseClient
      .auth
      .getUser();

  const user =
    data.user;

  if (!user) return;

  const name =
    user.user_metadata?.full_name ||
    user.email;

  const nameElement =
    document.getElementById(
      "profileName"
    );

  const emailElement =
    document.getElementById(
      "profileEmail"
    );

  if (nameElement) {

    nameElement.textContent =
      name;
  }

  if (emailElement) {

    emailElement.textContent =
      user.email;
  }

}

/* =========================================
   DASHBOARD NAVIGATION
========================================= */

function openSection(id) {

  const sections =
    document.querySelectorAll(
      ".section"
    );

  sections.forEach(section => {

    section.classList.remove(
      "active"
    );

  });

  const activeSection =
    document.getElementById(id);

  if (activeSection) {

    activeSection.classList.add(
      "active"
    );

  }

}

/* =========================================
   SEARCH
========================================= */

function searchContent() {

  const input =
    document.getElementById(
      "searchBox"
    );

  if (!input) return;

  const filter =
    input.value.toLowerCase();

  const items =
    document.querySelectorAll(
      ".card,.lesson"
    );

  items.forEach(item => {

    const text =
      item.textContent
        .toLowerCase();

    item.style.display =
      text.includes(filter)
        ? ""
        : "none";

  });

}
