
/* SafanBase Static Demo App (v5) */
// All data is stored in localStorage. Replace with a real backend when ready.
const SB = {
  state: {
    users: [], services: [], reviews: [], bookings: [], messages: [], notifications: [],
    opportunities: [], applications: [], favorites: [], currentUserId: null,
  },
  seed(){
    const users=[
      {id:'t1',name:'Siya Kolisi',email:'siya@safanbase.app',role:'Athlete',industry:'Sports',bio:'Springbok captain. Leadership & inspiration.',location:'Cape Town',photo:'assets/siya.jpg',active:true},
      {id:'t2',name:'Sho Madjozi',email:'sho@safanbase.app',role:'Celebrity',industry:'Music',bio:'Award-winning artist & cultural icon.',location:'Limpopo',photo:'assets/sho.jpg',active:true},
      {id:'t3',name:'Trevor Noah',email:'trevor@safanbase.app',role:'Celebrity',industry:'Film/TV',bio:'Comedian & storyteller.',location:'Johannesburg',photo:'assets/trevor.jpg',active:true},
      {id:'t4',name:'Kagiso Rabada',email:'rabada@safanbase.app',role:'Athlete',industry:'Sports',bio:'Proteas fast bowler.',location:'Gauteng',photo:'assets/rabada.jpg',active:true},
      {id:'t5',name:'Caster Semenya',email:'caster@safanbase.app',role:'Athlete',industry:'Sports',bio:'Olympic champion.',location:'Polokwane',photo:'assets/caster.jpg',active:true},
      {id:'t6',name:'Bonang Matheba',email:'bonang@safanbase.app',role:'Celebrity',industry:'Influencer',bio:'Media personality & businesswoman.',location:'Johannesburg',photo:'assets/bonang.jpg',active:true},
      {id:'f1',name:'Naledi M.',email:'naledi@safanbase.app',role:'Fan',industry:'',bio:'',location:'Durban',photo:'assets/fan.jpg',active:true},
      {id:'f2',name:'Thabo P.',email:'thabo@safanbase.app',role:'Fan',industry:'',bio:'',location:'Pretoria',photo:'assets/fan.jpg',active:true},
      {id:'admin',name:'Admin',email:'admin@safanbase.app',role:'Admin',industry:'',bio:'',location:'',photo:'assets/placeholder.jpg',active:true},
    ];
    const services=[
      {id:'s1',ownerId:'t1',title:'Motivational shoutout',description:'Personalised video for a birthday or team.',category:'SHOUTOUT',deliveryDays:3,active:true},
      {id:'s2',ownerId:'t2',title:'Song promo mention',description:'Short social endorsement.',category:'ENDORSEMENT',deliveryDays:5,active:true},
      {id:'s3',ownerId:'t3',title:'Congrats video',description:'Custom congratulations clip.',category:'CUSTOM',deliveryDays:4,active:true},
      {id:'s4',ownerId:'t4',title:'Cricket clinic Q&A',description:'Virtual appearance and advice.',category:'APPEARANCE',deliveryDays:7,active:true},
      {id:'s5',ownerId:'t5',title:'Inspiration message',description:'Motivational shoutout.',category:'SHOUTOUT',deliveryDays:3,active:true},
      {id:'s6',ownerId:'t6',title:'Brand IG story',description:'Authentic brand shout.',category:'ENDORSEMENT',deliveryDays:2,active:true},
    ];
    const reviews=[
      {id:'r1',talentId:'t1',fanId:'f1',rating:5,comment:'Absolutely inspiring!',createdAt:Date.now()-86400000*6},
      {id:'r2',talentId:'t2',fanId:'f2',rating:5,comment:'Loved the energy!',createdAt:Date.now()-86400000*3},
    ];
    const bookings=[]; const messages=[]; const notifications=[]; const opportunities=[]; const applications=[];
    const favorites=[{fanId:'f1',talentId:'t1'},{fanId:'f1',talentId:'t2'}];
    localStorage.setItem('sb_users',JSON.stringify(users));
    localStorage.setItem('sb_services',JSON.stringify(services));
    localStorage.setItem('sb_reviews',JSON.stringify(reviews));
    localStorage.setItem('sb_bookings',JSON.stringify(bookings));
    localStorage.setItem('sb_messages',JSON.stringify(messages));
    localStorage.setItem('sb_notifications',JSON.stringify(notifications));
    localStorage.setItem('sb_opportunities',JSON.stringify(opportunities));
    localStorage.setItem('sb_applications',JSON.stringify(applications));
    localStorage.setItem('sb_favorites',JSON.stringify(favorites));
    localStorage.setItem('sb_v5_seed','1');
  },
  init(){
    if(!localStorage.getItem('sb_v5_seed')) SB.seed();
    SB.state.users = JSON.parse(localStorage.getItem('sb_users')||'[]');
    SB.state.services = JSON.parse(localStorage.getItem('sb_services')||'[]');
    SB.state.reviews = JSON.parse(localStorage.getItem('sb_reviews')||'[]');
    SB.state.bookings = JSON.parse(localStorage.getItem('sb_bookings')||'[]');
    SB.state.messages = JSON.parse(localStorage.getItem('sb_messages')||'[]');
    SB.state.notifications = JSON.parse(localStorage.getItem('sb_notifications')||'[]');
    SB.state.opportunities = JSON.parse(localStorage.getItem('sb_opportunities')||'[]');
    SB.state.applications = JSON.parse(localStorage.getItem('sb_applications')||'[]');
    SB.state.favorites = JSON.parse(localStorage.getItem('sb_favorites')||'[]');
    SB.state.currentUserId = localStorage.getItem('sb_current') || null;
    SB.refreshNotifBadge();

    if(document.getElementById('featuredGrid')) SB.renderFeatured();
    if(document.getElementById('exploreGrid')) SB.renderExplore();
    if(document.getElementById('serviceTypes')) SB.renderServiceTypes();
    if(document.getElementById('profileHeader')) SB.renderProfile();
    if(document.getElementById('bookingInfo')) SB.renderBookingInfo();
    if(document.getElementById('threads')) SB.renderInbox();
    if(document.getElementById('whoami')) SB.renderDashboard();
    if(document.getElementById('oppList')) SB.renderOpps();
    if(document.getElementById('adminGate')) SB.renderAdmin();
  },
  save(){
    localStorage.setItem('sb_users',JSON.stringify(SB.state.users));
    localStorage.setItem('sb_services',JSON.stringify(SB.state.services));
    localStorage.setItem('sb_reviews',JSON.stringify(SB.state.reviews));
    localStorage.setItem('sb_bookings',JSON.stringify(SB.state.bookings));
    localStorage.setItem('sb_messages',JSON.stringify(SB.state.messages));
    localStorage.setItem('sb_notifications',JSON.stringify(SB.state.notifications));
    localStorage.setItem('sb_opportunities',JSON.stringify(SB.state.opportunities));
    localStorage.setItem('sb_applications',JSON.stringify(SB.state.applications));
    localStorage.setItem('sb_favorites',JSON.stringify(SB.state.favorites));
    SB.refreshNotifBadge();
  },
  // Demo helpers
  resetDemo(){ localStorage.clear(); SB.seed(); alert('Demo data reset. Reloading…'); location.reload(); },
  demoLogin(kind){ const ids={fan:'f1',talent:'t1',admin:'admin'}; localStorage.setItem('sb_current',ids[kind]); alert('Logged in as '+kind); location.reload(); },
  logout(){ localStorage.removeItem('sb_current'); alert('Logged out'); location.reload(); },
  // Notifications
  refreshNotifBadge(){ const me=SB.state.currentUserId; const dot=document.getElementById('notifDot'); if(!dot) return; const unread=SB.state.notifications.filter(n=>n.userId===me && !n.read).length; dot.textContent=String(unread||0); },
  notify(userId,type,payload){ SB.state.notifications.push({id:'n'+Math.random().toString(36).slice(2,8),userId,type,payload,read:false,createdAt:Date.now()}); SB.save(); },
  // Home & Explore
  searchFromHome(){ const q=(document.getElementById('homeSearch').value||'').trim(); window.location.href=`pages/explore.html?q=${encodeURIComponent(q)}`; },
  renderFeatured(){ const grid=document.getElementById('featuredGrid'); const talents=SB.state.users.filter(u=>u.active!==false && u.role!=='Fan' && u.role!=='Admin').slice(0,6); grid.innerHTML=talents.map(SB.talentCard).join(''); },
  filterExplore(){
    const q=(document.getElementById('q').value||'').toLowerCase();
    const role=document.getElementById('role').value;
    const ind=document.getElementById('industry').value;
    const cat=document.getElementById('category').value;
    const grid=document.getElementById('exploreGrid');
    let talents=SB.state.users.filter(u=>u.active!==false && u.role!=='Fan' && u.role!=='Admin');
    talents=talents.filter(u=>{
      const matchesQ=!q||[u.name,u.industry,u.location].join(' ').toLowerCase().includes(q);
      const matchesRole=!role||u.role===role;
      const matchesInd=!ind||u.industry===ind;
      return matchesQ && matchesRole && matchesInd;
    });
    if(cat){ const owners=new Set(SB.state.services.filter(s=>s.category===cat && s.active!==false).map(s=>s.ownerId)); talents=talents.filter(u=>owners.has(u.id)); }
    grid.innerHTML = talents.map(SB.talentCard).join('') || '<div class="alert">No results.</div>';
  },
  renderExplore(){ const params=new URLSearchParams(window.location.search); const q=params.get('q')||''; const cat=params.get('category')||''; const qInput=document.getElementById('q'); if(qInput) qInput.value=q; const catSel=document.getElementById('category'); if(catSel&&cat) catSel.value=cat; SB.filterExplore(); },
  talentCard(u){
    const cover=u.photo||'assets/placeholder.jpg';
    const favCount=SB.state.favorites.filter(f=>f.talentId===u.id).length;
    const avg=SB.avgRating(u.id);
    return `<a class="talent-card" href="profile.html?id=${u.id}">
      <img class="talent-thumb" src="${cover}" alt="${u.name}">
      <div class="body">
        <div class="talent-meta">
          <img src="${cover}" alt="${u.name} avatar">
          <div><div class="talent-name">${u.name}</div><div class="muted">${u.role} · ${u.industry||''}</div></div>
        </div>
        <p class="muted" style="margin-top:8px">${u.bio||''}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          <span class="tag">${u.location||'South Africa'}</span>
          <span class="tag">❤ ${favCount}</span>
          <span class="tag">⭐ ${avg}</span>
        </div>
      </div></a>`;
  },
  avgRating(talentId){ const rs=SB.state.reviews.filter(r=>r.talentId===talentId); if(!rs.length) return '—'; return (rs.reduce((a,b)=>a+b.rating,0)/rs.length).toFixed(1)},
  serviceCount(ownerId){ return SB.state.services.filter(s=>s.ownerId===ownerId && s.active!==false).length; },
  userName(id){ return (SB.state.users.find(u=>u.id===id)||{}).name||'User'; },
  // Profile
  toggleRoleFields(){ const role=document.getElementById('roleSelect')?.value; const rf=document.getElementById('roleFields'); if(!rf) return; if(role==='Athlete'||role==='Celebrity') rf.classList.remove('hidden'); else rf.classList.add('hidden'); },
  renderProfile(){
    const id=new URLSearchParams(window.location.search).get('id');
    const user=SB.state.users.find(u=>u.id===id);
    const header=document.getElementById('profileHeader');
    if(!user||user.active===false){ header.innerHTML='<div class="body">Not found.</div>'; return; }
    const favBtn=document.getElementById('favBtn'); if(favBtn){ const isFav=SB.isFav(id); favBtn.textContent=isFav?'❤ Favourited':'❤ Favourite'; }
    header.innerHTML=`
      <div class="body" style="display:grid;grid-template-columns:160px 1fr;gap:16px;align-items:center">
        <img src="${user.photo}" style="width:160px;height:160px;border-radius:18px;object-fit:cover">
        <div>
          <h2 style="margin:0">${user.name}</h2>
          <div class="muted">${user.role} · ${user.industry||''} · ${user.location||'South Africa'}</div>
          <p class="muted" style="margin-top:6px">${user.bio||''}</p>
          <div style="display:flex;gap:8px;margin-top:8px">
            <span class="chip">Avg Rating: ${SB.avgRating(user.id)}</span>
            <span class="chip">Services: ${SB.serviceCount(user.id)}</span>
            <span class="chip">❤ ${SB.state.favorites.filter(f=>f.talentId===user.id).length}</span>
          </div>
        </div>
      </div>`;
    const list=SB.state.services.filter(s=>s.ownerId===user.id && s.active!==false);
    document.getElementById('profileServices').innerHTML=list.map(s=>`
      <div class="card"><div class="body">
        <strong>${s.title}</strong><p class="muted">${s.description}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
          <span class="tag">${s.category}</span><span class="tag">~ ${s.deliveryDays} days</span>
        </div>
        <a class="btn" href="booking.html?serviceId=${s.id}">Request Service</a>
      </div></div>`).join('') || '<div class="card"><div class="body">No services yet.</div></div>';
    const rs=SB.state.reviews.filter(r=>r.talentId===user.id);
    document.getElementById('profileReviews').innerHTML = rs.length? rs.map(r=>`
      <div class="card"><div class="body">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <img style="width:28px;height:28px;border-radius:50%" src="../assets/fan.jpg"><strong>${SB.userName(r.fanId)}</strong><span>⭐ ${r.rating}</span>
        </div><div>${r.comment}</div>
      </div></div>`).join(''): '<div class="card"><div class="body"><em>No reviews yet.</em></div></div>';
  },
  isFav(talentId){ const me=SB.state.currentUserId; if(!me) return false; return SB.state.favorites.some(f=>f.fanId===me && f.talentId===talentId); },
  toggleFavoriteOnProfile(){
    const me=SB.state.currentUserId; if(!me){ alert('Login as a fan to favourite'); return; }
    const role=(SB.state.users.find(u=>u.id===me)||{}).role; if(role!=='Fan'){ alert('Only fans can favourite talents'); return; }
    const id=new URLSearchParams(window.location.search).get('id');
    const idx=SB.state.favorites.findIndex(f=>f.fanId===me && f.talentId===id);
    if(idx>=0){ SB.state.favorites.splice(idx,1); } else { SB.state.favorites.push({fanId:me,talentId:id}); }
    SB.save(); SB.renderProfile();
  },
  // Auth
  handleRegister(e){
    e.preventDefault();
    const fd=new FormData(e.target);
    const name=fd.get('name')?.toString().trim();
    const email=fd.get('email')?.toString().trim();
    const pw=fd.get('password')?.toString();
    const cf=fd.get('confirm')?.toString();
    const role=fd.get('role')?.toString();
    if(!name||!email||!pw||pw!==cf){ alert('Complete the form and ensure passwords match.'); return; }
    const id='u'+Math.random().toString(36).slice(2,8);
    const u={id,name,email,role,location:fd.get('location')?.toString()||'',industry:fd.get('industry')?.toString()||'',bio:fd.get('bio')?.toString()||'',photo:'assets/placeholder.jpg',active:true};
    const file=fd.get('photo');
    if(file && file.name){
      const reader=new FileReader();
      reader.onload=()=>{ u.photo=reader.result; SB._finishRegister(u); };
      reader.readAsDataURL(file);
    } else { SB._finishRegister(u); }
  },
  _finishRegister(u){ SB.state.users.push(u); SB.save(); localStorage.setItem('sb_current',u.id); SB.notify(u.id,'welcome',{msg:'Welcome to SafanBase!'}); alert('Account created (demo). You are now logged in.'); window.location.href='dashboard.html'; },
  handleLogin(e){
    e.preventDefault();
    const fd=new FormData(e.target);
    const email=fd.get('email')?.toString();
    const user=SB.state.users.find(x=>x.email===email && x.active!==false);
    if(!user){ alert('User not found (demo).'); return; }
    localStorage.setItem('sb_current',user.id);
    alert('Logged in (demo) as '+user.name);
    window.location.href='../index.html';
  },
  // Booking & Messaging
  renderBookingInfo(){
    const sid=new URLSearchParams(window.location.search).get('serviceId');
    const s=SB.state.services.find(x=>x.id===sid && x.active!==false);
    const info=document.getElementById('bookingInfo');
    if(!s){ info.textContent='Service not found.'; return; }
    const talent=SB.state.users.find(u=>u.id===s.ownerId);
    info.innerHTML=`Booking <strong>${s.title}</strong> · <span class="muted">${s.category}</span> by <strong>${talent?.name||'Talent'}</strong> (~${s.deliveryDays} days)`;
  },
  handleBooking(e){
    e.preventDefault();
    const sid=new URLSearchParams(window.location.search).get('serviceId');
    const s=SB.state.services.find(x=>x.id===sid && x.active!==false);
    if(!s){ alert('Service not found.'); return; }
    const fd=new FormData(e.target);
    const message=fd.get('message')?.toString()||'';
    const due=fd.get('due')?.toString()||'';
    const email=fd.get('email')?.toString()||'';
    const fanId=SB.state.currentUserId||'f1';
    const b={id:'b'+Math.random().toString(36).slice(2,8),serviceId:s.id,talentId:s.ownerId,fanId,message,dueDate:due,status:'PAID',responseUrl:'',contact:email,createdAt:Date.now()};
    SB.state.bookings.push(b); SB.save();
    SB.notify(s.ownerId,'booking:new',{bookingId:b.id,from:fanId});
    alert('Request submitted (demo). A paid booking has been created.');
    window.location.href='inbox.html';
  },
  renderInbox(){
    const me=SB.state.currentUserId||'f1';
    const myBookings=SB.state.bookings.filter(b=>b.fanId===me||b.talentId===me);
    const list=document.getElementById('threads'); if(!list) return;
    list.innerHTML=myBookings.length? myBookings.map(b=>{
      const otherId=b.fanId===me?b.talentId:b.fanId;
      const other=SB.state.users.find(u=>u.id===otherId);
      const label=b.responseUrl?'Delivered':(b.status||'requested');
      return `<div class="card" style="margin-top:8px;cursor:pointer" onclick="SB.openThread('${b.id}','${otherId}')">
        <div class="body"><strong>${other?.name||'User'}</strong><div class="muted">${b.message.slice(0,60)}… · <span class="chip">${label}</span></div></div>
      </div>`;
    }).join(''):'<div class="alert">No conversations yet. Make a booking first.</div>';
    SB.renderMessages();
  },
  openThread(bookingId,otherId){ SB.state.chatWith=JSON.stringify({bookingId,otherId}); SB.renderMessages(); },
  renderMessages(){
    const box=document.getElementById('messages'); const title=document.getElementById('chatWith'); const form=document.getElementById('msgForm');
    if(!box||!title||!form) return;
    if(!SB.state.chatWith){ title.textContent='Select a conversation'; box.innerHTML=''; form.classList.add('hidden'); return; }
    const {bookingId,otherId}=JSON.parse(SB.state.chatWith);
    const me=SB.state.currentUserId||'f1';
    const other=SB.state.users.find(u=>u.id===otherId);
    title.textContent='Chat with '+(other?.name||'User');
    const msgs=SB.state.messages.filter(m=>m.bookingId===bookingId);
    box.innerHTML=msgs.map(m=>`<div style="margin:6px 0;display:flex;gap:8px;${m.senderId===me?'justify-content:flex-end':''}"><div style="max-width:70%;background:${m.senderId===me?'#0ea5e9':'#10233a'};color:${m.senderId===me?'#05223a':'#cfe7ff'};padding:10px 12px;border-radius:12px">${m.content}</div></div>`).join('');
    form.classList.remove('hidden'); form.dataset.bookingId=bookingId;
  },
  sendMessage(e){
    e.preventDefault();
    const me=SB.state.currentUserId||'f1';
    const content=(new FormData(e.target)).get('content')?.toString().trim();
    const bookingId=e.target.dataset.bookingId;
    if(!content) return;
    const b=SB.state.bookings.find(x=>x.id===bookingId);
    const otherId=b ? (b.fanId===me?b.talentId:b.fanId):null;
    SB.state.messages.push({id:'m'+Math.random().toString(36).slice(2,8),bookingId,senderId:me,content,createdAt:Date.now()});
    SB.save();
    if(otherId) SB.notify(otherId,'message:new',{bookingId});
    e.target.reset(); SB.renderMessages();
  },
  deliver(bid){
    const input=document.getElementById('resp_'+bid);
    const url=input?.value?.trim();
    if(!url){ alert('Paste a valid URL'); return; }
    const b=SB.state.bookings.find(x=>x.id===bid); if(!b) return;
    b.status='COMPLETED'; b.responseUrl=url; SB.save();
    SB.notify(b.fanId,'delivery:new',{bookingId:bid,url});
    alert('Delivery posted. The fan can view it from their dashboard/inbox.');
    SB.renderDashboard();
  },
  // Dashboard
  renderDashboard(){
    const me=SB.state.currentUserId||'f1';
    const user=SB.state.users.find(u=>u.id===me);
    const who=document.getElementById('whoami'); if(who) who.innerHTML=`Logged in as <strong>${user?.name||'Guest (seed fan)'}</strong> · <span class="chip">${user?.role||'Fan'}</span>`;
    const table=document.getElementById('bookingTable');
    if(table){
      const rows=SB.state.bookings.filter(b=>b.fanId===me||b.talentId===me).map(b=>{
        const s=SB.state.services.find(x=>x.id===b.serviceId);
        const otherId=b.fanId===me?b.talentId:b.fanId;
        const other=SB.state.users.find(u=>u.id===otherId);
        let actions='';
        if(b.talentId===me){
          actions=`<div class="form-row"><input class="input" id="resp_${b.id}" placeholder="Paste response URL (e.g., video link)"><button class="btn" onclick="SB.deliver('${b.id}')">Deliver</button></div>`;
        }else if(b.responseUrl){
          actions=`<a class="btn btn-outline" href="${b.responseUrl}" target="_blank">View Delivery</a>`;
        }
        return `<tr><td><strong>${s?.title||'Service'}</strong><div class="muted">${s?.category||''}</div></td><td>${user?.role==='Fan'?'You → '+(other?.name||'Talent'):(other?.name||'Fan')+' → You'}</td><td>${b.status}${b.responseUrl?' · delivered':''}</td><td>${b.dueDate||'-'}</td><td>${actions}</td></tr>`;
      }).join('');
      table.innerHTML=`<tr><th>Service</th><th>Parties</th><th>Status</th><th>Due</th><th>Actions</th></tr>${rows||'<tr><td colspan="5">No bookings yet.</td></tr>'}`;
    }
    const list=document.getElementById('serviceList');
    if(list){
      const mine=SB.state.services.filter(s=>s.ownerId===me);
      list.innerHTML=mine.length? mine.map(s=>`<div class="card" style="margin:8px 0"><div class="body"><strong>${s.title}</strong> <span class="tag">${s.category}</span> · <span class="muted">~${s.deliveryDays} days</span></div></div>`).join(''):'<div class="alert">No services yet. Add one below.</div>';
    }
    const favList=document.getElementById('favList');
    if(favList){
      const favs=SB.state.favorites.filter(f=>f.fanId===me).map(f=>SB.state.users.find(u=>u.id===f.talentId)).filter(Boolean);
      favList.innerHTML=favs.length? favs.map(u=>`<div class="card" style="margin:8px 0"><div class="body">${u.name} · <span class="muted">${u.role} · ${u.industry}</span></div></div>`).join(''):'<div class="alert">No favourites yet.</div>';
    }
  },
  addService(e){
    e.preventDefault();
    const me=SB.state.currentUserId||'f1';
    const fd=new FormData(e.target);
    const title=fd.get('title')?.toString().trim();
    const category=fd.get('category')?.toString().trim().toUpperCase();
    const delivery=parseInt(fd.get('delivery')?.toString()||'0',10)||3;
    const desc=fd.get('desc')?.toString().trim();
    if(!title||!category){ alert('Enter title & category'); return; }
    SB.state.services.push({id:'s'+Math.random().toString(36).slice(2,8),ownerId:me,title,description:desc,category,deliveryDays:delivery,active:true});
    SB.save(); SB.notify(me,'service:new',{title}); alert('Service added.'); SB.renderDashboard(); e.target.reset();
  },
  // Brands hub
  postOpportunity(e){
    e.preventDefault();
    const me=SB.state.currentUserId||'f1';
    const fd=new FormData(e.target);
    const opp={id:'o'+Math.random().toString(36).slice(2,8),ownerId:me,title:fd.get('title')?.toString().trim(),category:fd.get('category')?.toString().trim(),budget:fd.get('budget')?.toString().trim(),deadline:fd.get('deadline')?.toString(),desc:fd.get('desc')?.toString().trim(),createdAt:Date.now(),active:true};
    SB.state.opportunities.push(opp); SB.save(); SB.notify(me,'opp:posted',{id:opp.id}); e.target.reset(); SB.renderOpps();
  },
  renderOpps(){
    const list=document.getElementById('oppList'); if(!list) return;
    const items=SB.state.opportunities.filter(o=>o.active!==false).map(o=>{
      const owner=SB.state.users.find(u=>u.id===o.ownerId);
      return `<div class="card" style="margin:8px 0"><div class="body"><strong>${o.title}</strong> <span class="tag">${o.category}</span> <span class="muted">${o.budget||'Budget on request'}</span><p class="muted">${o.desc||''}</p><div class="form-row"><button class="btn" onclick="SB.applyOpp('${o.id}')">Apply (Talent)</button><span class="muted">Posted by ${owner?.name||'User'}</span></div></div></div>`;
    }).join('');
    list.innerHTML=items||'<div class="alert">No opportunities yet.</div>';
  },
  applyOpp(oppId){
    const me=SB.state.currentUserId||'t1';
    const user=SB.state.users.find(u=>u.id===me);
    if(!user||(user.role!=='Athlete'&&user.role!=='Celebrity')){ alert('Only talents can apply.'); return; }
    SB.state.applications.push({id:'a'+Math.random().toString(36).slice(2,8),oppId,userId:me,createdAt:Date.now()});
    const opp=SB.state.opportunities.find(o=>o.id===oppId); if(opp) SB.notify(opp.ownerId,'opp:application',{oppId,userId:me});
    SB.save(); alert('Applied!');
  },
  // Admin
  renderAdmin(){
    const gate=document.getElementById('adminGate'); const panels=document.getElementById('adminPanels'); const me=SB.state.currentUserId; const user=SB.state.users.find(u=>u.id===me);
    if(!user||user.role!=='Admin'){ gate.textContent='Access denied (demo). Login as Demo Admin.'; panels.classList.add('hidden'); return; }
    gate.textContent='Admin access granted.'; panels.classList.remove('hidden');
    document.getElementById('admUsers').innerHTML=SB.state.users.map(u=>`<div class="card" style="margin:6px 0"><div class="body">${u.name} <span class="tag">${u.role}</span> ${u.active===false?'<span class="tag" style="background:#3b1e2a;color:#ffb4c0">INACTIVE</span>':''}<div style="margin-top:6px"><button class="btn btn-outline" onclick="SB.toggleUser('${u.id}')">${u.active===false?'Activate':'Deactivate'}</button></div></div></div>`).join('');
    document.getElementById('admServices').innerHTML=SB.state.services.map(s=>`<div class="card" style="margin:6px 0"><div class="body">${s.title} <span class="tag">${s.category}</span> ${s.active===false?'<span class="tag" style="background:#3b1e2a;color:#ffb4c0">INACTIVE</span>':''}<div style="margin-top:6px"><button class="btn btn-outline" onclick="SB.toggleService('${s.id}')">${s.active===false?'Activate':'Deactivate'}</button></div></div></div>`).join('');
    document.getElementById('admBookings').innerHTML=SB.state.bookings.map(b=>`<div class="card" style="margin:6px 0"><div class="body">Booking ${b.id} <span class="tag">${b.status}</span> · Service ${b.serviceId}</div></div>`).join('')||'<div class="alert">No bookings yet.</div>';
  },
  toggleUser(uid){ const u=SB.state.users.find(x=>x.id===uid); if(!u) return; u.active=!u.active; SB.save(); SB.renderAdmin(); },
  toggleService(sid){ const s=SB.state.services.find(x=>x.id===sid); if(!s) return; s.active=!s.active; SB.save(); SB.renderAdmin(); },
  // Misc
  renderServiceTypes(){
    const el=document.getElementById('serviceTypes'); if(!el) return;
    const cats=[
      {key:'SHOUTOUT',title:'Birthday Shoutouts',desc:'Personal video messages'},
      {key:'ENDORSEMENT',title:'Endorsements',desc:'Authentic brand promos'},
      {key:'APPEARANCE',title:'Appearances',desc:'Live & virtual events'},
      {key:'CUSTOM',title:'Custom Videos',desc:'Congrats, pep talks, more'},
      {key:'MERCH',title:'Merch Collabs',desc:'Co-create with talent'},
    ];
    el.innerHTML=cats.map(c=>`<div class="card"><div class="body"><strong>${c.title}</strong><p class="muted">${c.desc}</p><button class="btn" onclick="location.href='explore.html?category=${c.key}'">Browse</button></div></div>`).join('');
  },
};

document.addEventListener('DOMContentLoaded', SB.init);
