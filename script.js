/* © 2025 Lost & Found Worldwide (L&F). All rights reserved. See LICENSE. */

// ==========================================
//  Lost & Found Pro v3.1 - Global Edition
//  جميع الوظائف والمنطق - الإصدار النهائي
// ==========================================

// ========== المتغيرات العامة ==========
let lostArray = [];
let foundArray = [];
let currentUser = null;
let isAdmin = false;
let users = [];
let pendingUsers = [];
let pendingReports = [];
let activityLogs = [];
let dashboardMap = null;
let publicMap = null;
let lostSelectMap = null;
let foundSelectMap = null;
let lostMarker = null;
let foundMarker = null;
let selectedCategory = 'other';
let userPoints = {};
let userBalances = {};
let reportViews = {};
let adminNotifications = {};
let pendingOrganizations = [];

// ========== البيانات العالمية للدول والمدن ==========
const geoData = [
    {name:"Afghanistan", code:"+93", cities:["Kabul","Kandahar","Herat","Mazar-i-Sharif","Jalalabad","Kunduz","Ghazni","Balkh","Baghlan","Farah"]},
    {name:"Albania", code:"+355", cities:["Tirana","Durres","Vlore","Shkoder","Elbasan","Korce","Fier","Berat","Lushnje","Pogradec"]},
    {name:"Algeria", code:"+213", cities:["Algiers","Oran","Constantine","Annaba","Blida","Setif","Djelfa","Sidi Bel Abbes","Biskra","Tebessa"]},
    {name:"Andorra", code:"+376", cities:["Andorra la Vella","Escaldes-Engordany","Encamp","Sant Julia","La Massana"]},
    {name:"Angola", code:"+244", cities:["Luanda","Huambo","Lobito","Benguela","Namibe","Cabinda","Malanje","Saurimo","Cuito","Lubango"]},
    {name:"Argentina", code:"+54", cities:["Buenos Aires","Cordoba","Rosario","Mendoza","La Plata","Tucuman","Mar del Plata","Salta","Santa Fe","San Juan"]},
    {name:"Armenia", code:"+374", cities:["Yerevan","Gyumri","Vanadzor","Vagharshapat","Abovyan","Kapan","Hrazdan","Armavir","Artashat","Ijevan"]},
    {name:"Australia", code:"+61", cities:["Sydney","Melbourne","Brisbane","Perth","Adelaide","Gold Coast","Canberra","Newcastle","Hobart","Darwin"]},
    {name:"Austria", code:"+43", cities:["Vienna","Graz","Linz","Salzburg","Innsbruck","Klagenfurt","Villach","Wels","Sankt Polten","Bregenz"]},
    {name:"Azerbaijan", code:"+994", cities:["Baku","Ganja","Sumqayit","Mingachevir","Lankaran","Shirvan","Nakhchivan","Shamkir","Sheki","Yevlakh"]},
    {name:"Bahrain", code:"+973", cities:["Manama","Riffa","Muharraq","Hamad Town","Isa Town","Sitra","Budaiya","Jidhafs","A'ali","Sanabis"]},
    {name:"Bangladesh", code:"+880", cities:["Dhaka","Chittagong","Khulna","Rajshahi","Sylhet","Barisal","Rangpur","Comilla","Narayanganj","Mymensingh"]},
    {name:"Belarus", code:"+375", cities:["Minsk","Gomel","Mogilev","Vitebsk","Grodno","Brest","Babruysk","Baranovichi","Borisov","Pinsk"]},
    {name:"Belgium", code:"+32", cities:["Brussels","Antwerp","Ghent","Charleroi","Liege","Bruges","Namur","Leuven","Mons","Mechelen"]},
    {name:"Belize", code:"+501", cities:["Belize City","San Ignacio","Belmopan","Orange Walk","Corozal","Dangriga","Punta Gorda","San Pedro"]},
    {name:"Benin", code:"+229", cities:["Cotonou","Porto-Novo","Parakou","Djougou","Bohicon","Abomey","Nikki","Natitingou","Ouidah","Malanville"]},
    {name:"Bhutan", code:"+975", cities:["Thimphu","Phuntsholing","Paro","Punakha","Wangdue Phodrang","Trashigang","Bumthang","Gelephu","Samdrup Jongkhar","Mongar"]},
    {name:"Bolivia", code:"+591", cities:["La Paz","Santa Cruz","Cochabamba","Sucre","Oruro","Potosi","Tarija","Trinidad","Cobija","Riberalta"]},
    {name:"Bosnia", code:"+387", cities:["Sarajevo","Banja Luka","Tuzla","Zenica","Mostar","Doboj","Bijeljina","Brcko","Prijedor","Trebinje"]},
    {name:"Botswana", code:"+267", cities:["Gaborone","Francistown","Molepolole","Maun","Selibe Phikwe","Serowe","Kanye","Mahalapye","Mochudi","Mogoditshane"]},
    {name:"Brazil", code:"+55", cities:["Sao Paulo","Rio de Janeiro","Brasilia","Salvador","Fortaleza","Belo Horizonte","Manaus","Curitiba","Recife","Porto Alegre"]},
    {name:"Brunei", code:"+673", cities:["Bandar Seri Begawan","Kuala Belait","Seria","Tutong","Bangar","Muara"]},
    {name:"Bulgaria", code:"+359", cities:["Sofia","Plovdiv","Varna","Burgas","Ruse","Stara Zagora","Pleven","Dobrich","Sliven","Shumen"]},
    {name:"Burkina Faso", code:"+226", cities:["Ouagadougou","Bobo-Dioulasso","Koudougou","Banfora","Ouahigouya","Dedougou","Fada","Tenkodogo","Dori","Gaoua"]},
    {name:"Burundi", code:"+257", cities:["Bujumbura","Gitega","Ngozi","Rumonge","Cibitoke","Kayanza","Bubanza","Karuzi","Kirundo","Muyinga"]},
    {name:"Cambodia", code:"+855", cities:["Phnom Penh","Siem Reap","Battambang","Sihanoukville","Kampot","Pursat","Kampong Cham","Takeo","Kratie","Koh Kong"]},
    {name:"Cameroon", code:"+237", cities:["Douala","Yaounde","Garoua","Bamenda","Maroua","Ngaoundere","Bafoussam","Bertoua","Limbe","Kumba"]},
    {name:"Canada", code:"+1", cities:["Toronto","Vancouver","Montreal","Calgary","Ottawa","Edmonton","Quebec City","Winnipeg","Hamilton","Halifax"]},
    {name:"Chad", code:"+235", cities:["N'Djamena","Moundou","Sarh","Abeche","Kelo","Doba","Pala","Am Timan","Mongo","Bongor"]},
    {name:"Chile", code:"+56", cities:["Santiago","Valparaiso","Concepcion","La Serena","Antofagasta","Temuco","Puerto Montt","Arica","Iquique","Valdivia"]},
    {name:"China", code:"+86", cities:["Beijing","Shanghai","Guangzhou","Shenzhen","Chengdu","Tianjin","Wuhan","Chongqing","Nanjing","Hangzhou"]},
    {name:"Colombia", code:"+57", cities:["Bogota","Medellin","Cali","Barranquilla","Cartagena","Bucaramanga","Santa Marta","Pereira","Manizales","Armenia"]},
    {name:"Comoros", code:"+269", cities:["Moroni","Moutsamoudou","Fomboni","Domoni","Ouani"]},
    {name:"Congo", code:"+242", cities:["Brazzaville","Pointe-Noire","Dolisie","Nkayi","Ouesso","Madingou","Impfondo","Sibiti","Owando","Gamboma"]},
    {name:"Costa Rica", code:"+506", cities:["San Jose","Limon","Alajuela","Heredia","Cartago","Puntarenas","Liberia","San Isidro","Nicoya","Turrialba"]},
    {name:"Croatia", code:"+385", cities:["Zagreb","Split","Rijeka","Osijek","Zadar","Dubrovnik","Pula","Sibenik","Varazdin","Karlovac"]},
    {name:"Cuba", code:"+53", cities:["Havana","Santiago","Camaguey","Holguin","Santa Clara","Guantanamo","Bayamo","Cienfuegos","Pinar del Rio","Matanzas"]},
    {name:"Cyprus", code:"+357", cities:["Nicosia","Limassol","Larnaca","Paphos","Famagusta","Kyrenia"]},
    {name:"Czech Republic", code:"+420", cities:["Prague","Brno","Ostrava","Plzen","Liberec","Olomouc","Hradec Kralove","Pardubice","Zlin","Havirov"]},
    {name:"Denmark", code:"+45", cities:["Copenhagen","Aarhus","Odense","Aalborg","Esbjerg","Randers","Kolding","Horsens","Vejle","Roskilde"]},
    {name:"Djibouti", code:"+253", cities:["Djibouti City","Ali Sabieh","Tadjourah","Obock","Dikhil","Arta","Holhol","Yoboki"]},
    {name:"Dominican Republic", code:"+1", cities:["Santo Domingo","Santiago","La Romana","San Pedro","San Cristobal","Puerto Plata","La Vega","Moca","Bani","Higuey"]},
    {name:"DR Congo", code:"+243", cities:["Kinshasa","Lubumbashi","Mbuji-Mayi","Kisangani","Bukavu","Kananga","Likasi","Kolwezi","Tshikapa","Mbandaka"]},
    {name:"Ecuador", code:"+593", cities:["Quito","Guayaquil","Cuenca","Santo Domingo","Machala","Manta","Portoviejo","Ambato","Riobamba","Esmeraldas"]},
    {name:"Egypt", code:"+20", cities:["Cairo","Alexandria","Giza","Luxor","Aswan","Port Said","Suez","Mansoura","Tanta","Zagazig"]},
    {name:"El Salvador", code:"+503", cities:["San Salvador","Santa Ana","San Miguel","Sonsonate","Apopa","Mejicanos","Soyapango","Delgado","Zacatecoluca","Usulutan"]},
    {name:"Equatorial Guinea", code:"+240", cities:["Malabo","Bata","Ebebiyin","Mongomo","Evinayong","Luba","Aconibe","Anisoc"]},
    {name:"Eritrea", code:"+291", cities:["Asmara","Keren","Massawa","Assab","Mendefera","Barentu","Adi Quala","Teseney"]},
    {name:"Estonia", code:"+372", cities:["Tallinn","Tartu","Narva","Parnu","Kohtla-Jarve","Viljandi","Rakvere","Sillamae","Maardu","Kuressaare"]},
    {name:"Eswatini", code:"+268", cities:["Mbabane","Manzini","Lobamba","Siteki","Piggs Peak","Nhlangano","Mhlume","Big Bend"]},
    {name:"Ethiopia", code:"+251", cities:["Addis Ababa","Dire Dawa","Mekele","Adama","Gondar","Hawassa","Bahir Dar","Jimma","Dessie","Shashamane"]},
    {name:"Fiji", code:"+679", cities:["Suva","Nadi","Lautoka","Labasa","Ba","Savusavu","Levuka","Sigatoka","Rakiraki","Tavua"]},
    {name:"Finland", code:"+358", cities:["Helsinki","Espoo","Tampere","Vantaa","Turku","Oulu","Lahti","Kuopio","Jyvaskyla","Pori"]},
    {name:"France", code:"+33", cities:["Paris","Marseille","Lyon","Toulouse","Nice","Nantes","Strasbourg","Montpellier","Bordeaux","Lille"]},
    {name:"Gabon", code:"+241", cities:["Libreville","Port-Gentil","Franceville","Oyem","Moanda","Mouila","Lambarene","Tchibanga"]},
    {name:"Gambia", code:"+220", cities:["Banjul","Serekunda","Brikama","Bakau","Farafenni","Lamin","Basse Santa Su","Bansang"]},
    {name:"Georgia", code:"+995", cities:["Tbilisi","Batumi","Kutaisi","Rustavi","Zugdidi","Gori","Poti","Telavi","Samtredia","Khashuri"]},
    {name:"Germany", code:"+49", cities:["Berlin","Hamburg","Munich","Cologne","Frankfurt","Stuttgart","Dusseldorf","Leipzig","Dortmund","Essen"]},
    {name:"Ghana", code:"+233", cities:["Accra","Kumasi","Tamale","Sekondi-Takoradi","Ashaiman","Sunyani","Cape Coast","Obuasi","Tema","Koforidua"]},
    {name:"Greece", code:"+30", cities:["Athens","Thessaloniki","Patras","Heraklion","Larissa","Volos","Ioannina","Chania","Kavala","Rhodes"]},
    {name:"Guatemala", code:"+502", cities:["Guatemala City","Mixco","Villa Nueva","Quetzaltenango","Escuintla","Amatitlan","Chinautla","Coban","Chimaltenango","Mazatenango"]},
    {name:"Guinea", code:"+224", cities:["Conakry","Nzerekore","Kankan","Kindia","Labe","Gueckedou","Mamou","Boke","Faranah","Kissidougou"]},
    {name:"Guinea-Bissau", code:"+245", cities:["Bissau","Bafata","Gabu","Cacheu","Bolama","Buba","Canchungo","Farim"]},
    {name:"Guyana", code:"+592", cities:["Georgetown","Linden","New Amsterdam","Anna Regina","Bartica","Mahaica","Rose Hall","Lethem"]},
    {name:"Haiti", code:"+509", cities:["Port-au-Prince","Cap-Haitien","Carrefour","Delmas","Petion-Ville","Gonaives","Saint-Marc","Jacmel","Les Cayes","Port-de-Paix"]},
    {name:"Honduras", code:"+504", cities:["Tegucigalpa","San Pedro Sula","Choloma","La Ceiba","El Progreso","Choluteca","Comayagua","Puerto Cortes","Siguatepeque","Danli"]},
    {name:"Hungary", code:"+36", cities:["Budapest","Debrecen","Szeged","Miskolc","Pecs","Gyor","Nyiregyhaza","Kecskemet","Szombathely","Szolnok"]},
    {name:"Iceland", code:"+354", cities:["Reykjavik","Kopavogur","Hafnarfjordur","Akureyri","Gardabaer","Mosfellsbaer","Akranes","Selfoss","Vestmannaeyjar","Isafjordur"]},
    {name:"India", code:"+91", cities:["Mumbai","Delhi","Bangalore","Hyderabad","Ahmedabad","Chennai","Kolkata","Surat","Pune","Jaipur"]},
    {name:"Indonesia", code:"+62", cities:["Jakarta","Surabaya","Bandung","Medan","Semarang","Makassar","Palembang","Depok","Tangerang","Bekasi"]},
    {name:"Iran", code:"+98", cities:["Tehran","Mashhad","Isfahan","Karaj","Shiraz","Tabriz","Qom","Ahvaz","Kermanshah","Rasht"]},
    {name:"Iraq", code:"+964", cities:["Baghdad","Basra","Mosul","Erbil","Kirkuk","Najaf","Karbala","Sulaymaniyah","Nasiriyah","Amara"]},
    {name:"Ireland", code:"+353", cities:["Dublin","Cork","Limerick","Galway","Waterford","Drogheda","Dundalk","Swords","Bray","Navan"]},
    {name:"Israel", code:"+972", cities:["Jerusalem","Tel Aviv","Haifa","Rishon LeZion","Petah Tikva","Ashdod","Netanya","Beersheba","Holon","Bnei Brak"]},
    {name:"Italy", code:"+39", cities:["Rome","Milan","Naples","Turin","Palermo","Genoa","Bologna","Florence","Venice","Verona"]},
    {name:"Ivory Coast", code:"+225", cities:["Abidjan","Bouake","Daloa","Yamoussoukro","San-Pedro","Divo","Korhogo","Anyama","Abengourou","Man"]},
    {name:"Jamaica", code:"+1", cities:["Kingston","Montego Bay","Spanish Town","Portmore","May Pen","Mandeville","Old Harbour","Savanna-la-Mar","Linstead","St. Ann's Bay"]},
    {name:"Japan", code:"+81", cities:["Tokyo","Yokohama","Osaka","Nagoya","Sapporo","Fukuoka","Kobe","Kyoto","Kawasaki","Saitama"]},
    {name:"Jordan", code:"+962", cities:["Amman","Irbid","Zarqa","Aqaba","Madaba","Salt","Karak","Mafraq","Jerash","Ajloun"]},
    {name:"Kazakhstan", code:"+7", cities:["Almaty","Astana","Shymkent","Karaganda","Aktobe","Taraz","Pavlodar","Ust-Kamenogorsk","Oral","Kostanay"]},
    {name:"Kenya", code:"+254", cities:["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Malindi","Kitale","Nyeri","Machakos","Thika"]},
    {name:"Kuwait", code:"+965", cities:["Kuwait City","Hawalli","Farwaniya","Salmiya","Jahra","Mubarak Al-Kabeer","Fahaheel","Sabah Al-Salem","Al Ahmadi","Al Fintas"]},
    {name:"Kyrgyzstan", code:"+996", cities:["Bishkek","Osh","Jalal-Abad","Karakol","Tokmok","Naryn","Talas","Kara-Balta","Balikchy","Uzgen"]},
    {name:"Laos", code:"+856", cities:["Vientiane","Luang Prabang","Pakse","Savannakhet","Thakhek","Phonsavan","Muang Xay","Vang Vieng"]},
    {name:"Latvia", code:"+371", cities:["Riga","Daugavpils","Liepaja","Jelgava","Jurmala","Ventspils","Rezekne","Valmiera","Jekabpils","Ogre"]},
    {name:"Lebanon", code:"+961", cities:["Beirut","Tripoli","Sidon","Tyre","Zahle","Baabda","Jounieh","Nabatieh","Batroun","Byblos"]},
    {name:"Lesotho", code:"+266", cities:["Maseru","Leribe","Mafeteng","Mohale's Hoek","Quthing","Butha-Buthe","Teyateyaneng","Mokhotlong"]},
    {name:"Liberia", code:"+231", cities:["Monrovia","Gbarnga","Kakata","Buchanan","Zwedru","Greenville","Voinjama","Robertsport","Harper","Sanniquellie"]},
    {name:"Libya", code:"+218", cities:["Tripoli","Benghazi","Misrata","Zawiya","Bayda","Tobruk","Ajdabiya","Sabha","Zliten","Derna"]},
    {name:"Liechtenstein", code:"+423", cities:["Vaduz","Schaan","Balzers","Triesen","Eschen","Mauren","Triesenberg","Ruggell"]},
    {name:"Lithuania", code:"+370", cities:["Vilnius","Kaunas","Klaipeda","Siauliai","Panevezys","Alytus","Mazeikiai","Jonava","Utena","Kedainiai"]},
    {name:"Luxembourg", code:"+352", cities:["Luxembourg City","Esch-sur-Alzette","Differdange","Dudelange","Ettelbruck","Diekirch","Wiltz","Remich"]},
    {name:"Madagascar", code:"+261", cities:["Antananarivo","Toamasina","Antsirabe","Fianarantsoa","Mahajanga","Toliara","Antsiranana","Morondava","Nosy Be","Manakara"]},
    {name:"Malawi", code:"+265", cities:["Lilongwe","Blantyre","Mzuzu","Zomba","Kasungu","Mangochi","Karonga","Salima","Nkhotakota","Liwonde"]},
    {name:"Malaysia", code:"+60", cities:["Kuala Lumpur","George Town","Ipoh","Johor Bahru","Shah Alam","Petaling Jaya","Kuching","Kota Kinabalu","Melaka","Alor Setar"]},
    {name:"Maldives", code:"+960", cities:["Male","Addu City","Fuvahmulah","Kulhudhuffushi","Thinadhoo","Naifaru","Hulhumale"]},
    {name:"Mali", code:"+223", cities:["Bamako","Sikasso","Mopti","Koutiala","Segou","Gao","Kayes","Timbuktu","Kidal","Djenne"]},
    {name:"Malta", code:"+356", cities:["Valletta","Birkirkara","Mosta","Qormi","Zabbar","Sliema","San Gwann","Rabat"]},
    {name:"Mauritania", code:"+222", cities:["Nouakchott","Nouadhibou","Kiffa","Zouerat","Atar","Rosso","Kaedi","Selibaby","Aleg","Akjoujt"]},
    {name:"Mauritius", code:"+230", cities:["Port Louis","Beau Bassin","Vacoas-Phoenix","Curepipe","Quatre Bornes","Triolet","Goodlands","Bel Air"]},
    {name:"Mexico", code:"+52", cities:["Mexico City","Guadalajara","Monterrey","Puebla","Toluca","Tijuana","Leon","Queretaro","Juarez","Cancun"]},
    {name:"Moldova", code:"+373", cities:["Chisinau","Balti","Bender","Tiraspol","Cahul","Ungheni","Soroca","Orhei","Comrat","Dubasari"]},
    {name:"Monaco", code:"+377", cities:["Monaco-Ville","Monte Carlo","La Condamine","Fontvieille"]},
    {name:"Mongolia", code:"+976", cities:["Ulaanbaatar","Erdenet","Darkhan","Choibalsan","Moron","Khovd","Olgiy","Bayankhongor","Arvaikheer","Ulaangom"]},
    {name:"Montenegro", code:"+382", cities:["Podgorica","Niksic","Bijelo Polje","Herceg Novi","Cetinje","Bar","Budva","Kotor","Berane","Pljevlja"]},
    {name:"Morocco", code:"+212", cities:["Casablanca","Rabat","Marrakech","Fes","Tangier","Agadir","Meknes","Oujda","Kenitra","Tetouan"]},
    {name:"Mozambique", code:"+258", cities:["Maputo","Beira","Nampula","Matola","Chimoio","Quelimane","Tete","Lichinga","Pemba","Inhambane"]},
    {name:"Myanmar", code:"+95", cities:["Yangon","Mandalay","Naypyidaw","Mawlamyine","Bago","Pathein","Sittwe","Taunggyi","Myitkyina","Monywa"]},
    {name:"Namibia", code:"+264", cities:["Windhoek","Swakopmund","Walvis Bay","Oshakati","Otjiwarongo","Rundu","Luderitz","Keetmanshoop","Gobabis","Tsumeb"]},
    {name:"Nepal", code:"+977", cities:["Kathmandu","Pokhara","Lalitpur","Biratnagar","Bharatpur","Birgunj","Dharan","Janakpur","Hetauda","Nepalgunj"]},
    {name:"Netherlands", code:"+31", cities:["Amsterdam","Rotterdam","The Hague","Utrecht","Eindhoven","Groningen","Tilburg","Almere","Breda","Nijmegen"]},
    {name:"New Zealand", code:"+64", cities:["Auckland","Wellington","Christchurch","Hamilton","Tauranga","Dunedin","Napier","Palmerston North","Rotorua","New Plymouth"]},
    {name:"Nicaragua", code:"+505", cities:["Managua","Leon","Masaya","Matagalpa","Chinandega","Granada","Esteli","Jinotega","Juigalpa","Bluefields"]},
    {name:"Niger", code:"+227", cities:["Niamey","Maradi","Zinder","Agadez","Tahoua","Dosso","Diffa","Gaya","Tessaoua","Birni"]},
    {name:"Nigeria", code:"+234", cities:["Lagos","Kano","Ibadan","Abuja","Port Harcourt","Benin City","Maiduguri","Zaria","Aba","Jos"]},
    {name:"North Korea", code:"+850", cities:["Pyongyang","Hamhung","Chongjin","Sinuiju","Wonsan","Nampo","Kaesong","Haeju","Kanggye","Hyesan"]},
    {name:"North Macedonia", code:"+389", cities:["Skopje","Bitola","Kumanovo","Prilep","Tetovo","Ohrid","Veles","Strumica","Gostivar","Stip"]},
    {name:"Norway", code:"+47", cities:["Oslo","Bergen","Trondheim","Stavanger","Drammen","Fredrikstad","Kristiansand","Sandnes","Tromso","Sarpsborg"]},
    {name:"Oman", code:"+968", cities:["Muscat","Salalah","Sohar","Nizwa","Sur","Ibri","Rustaq","Barka","Khasab","Al Buraimi"]},
    {name:"Pakistan", code:"+92", cities:["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Gujranwala","Sialkot"]},
    {name:"Palestine", code:"+970", cities:["Gaza","Ramallah","Hebron","Nablus","Bethlehem","Jericho","Jenin","Tulkarm","Qalqilya","Khan Yunis"]},
    {name:"Panama", code:"+507", cities:["Panama City","Colon","David","La Chorrera","Santiago","Penonome","Chitre","Puerto Armuelles","Changuinola","Aguadulce"]},
    {name:"Paraguay", code:"+595", cities:["Asuncion","Ciudad del Este","Encarnacion","San Lorenzo","Luque","Capiata","Lambare","Fernando de la Mora","Limpio","Nemby"]},
    {name:"Peru", code:"+51", cities:["Lima","Arequipa","Trujillo","Chiclayo","Callao","Iquitos","Piura","Cusco","Chimbote","Huancayo"]},
    {name:"Philippines", code:"+63", cities:["Manila","Quezon City","Davao City","Cebu City","Caloocan","Zamboanga City","Taguig","Antipolo","Pasig","Makati"]},
    {name:"Poland", code:"+48", cities:["Warsaw","Krakow","Wroclaw","Lodz","Poznan","Gdansk","Szczecin","Bydgoszcz","Lublin","Katowice"]},
    {name:"Portugal", code:"+351", cities:["Lisbon","Porto","Braga","Coimbra","Setubal","Faro","Amadora","Funchal","Evora","Cascais"]},
    {name:"Qatar", code:"+974", cities:["Doha","Al Rayyan","Al Wakrah","Al Khor","Umm Salal","Mesaieed","Dukhan","Al Shamal","Al Zubara"]},
    {name:"Romania", code:"+40", cities:["Bucharest","Cluj-Napoca","Timisoara","Iasi","Constanta","Craiova","Galati","Brasov","Ploiesti","Oradea"]},
    {name:"Russia", code:"+7", cities:["Moscow","Saint Petersburg","Novosibirsk","Yekaterinburg","Kazan","Nizhny Novgorod","Chelyabinsk","Samara","Omsk","Rostov-on-Don"]},
    {name:"Rwanda", code:"+250", cities:["Kigali","Butare","Gitarama","Ruhengeri","Gisenyi","Cyangugu","Kibuye","Kibungo","Byumba","Rwamagana"]},
    {name:"Saudi Arabia", code:"+966", cities:["Riyadh","Jeddah","Mecca","Medina","Dammam","Taif","Tabuk","Buraydah","Khamis Mushait","Al Hufuf"]},
    {name:"Senegal", code:"+221", cities:["Dakar","Touba","Thies","Kaolack","Saint-Louis","Ziguinchor","Diourbel","Louga","Mbour","Rufisque"]},
    {name:"Serbia", code:"+381", cities:["Belgrade","Novi Sad","Nis","Kragujevac","Subotica","Zrenjanin","Pancevo","Cacak","Novi Pazar","Kraljevo"]},
    {name:"Seychelles", code:"+248", cities:["Victoria","Anse Boileau","Beau Vallon","Takamaka","Grand Anse","Anse Royale","Baie Lazare"]},
    {name:"Sierra Leone", code:"+232", cities:["Freetown","Bo","Kenema","Makeni","Koidu","Waterloo","Port Loko","Lunsar","Magburaka","Moyamba"]},
    {name:"Singapore", code:"+65", cities:["Singapore City","Jurong","Woodlands","Tampines","Yishun","Ang Mo Kio","Bedok","Bukit Merah"]},
    {name:"Slovakia", code:"+421", cities:["Bratislava","Kosice","Presov","Zilina","Nitra","Banska Bystrica","Trnava","Martin","Trencin","Poprad"]},
    {name:"Slovenia", code:"+386", cities:["Ljubljana","Maribor","Celje","Kranj","Novo Mesto","Velenje","Nova Gorica","Koper","Ptuj","Murska Sobota"]},
    {name:"Somalia", code:"+252", cities:["Mogadishu","Hargeisa","Kismayo","Baidoa","Bosaso","Galkayo","Merca","Beledweyne","Garoowe","Las Anod"]},
    {name:"South Africa", code:"+27", cities:["Johannesburg","Cape Town","Durban","Pretoria","Port Elizabeth","Bloemfontein","East London","Pietermaritzburg","Kimberley","Nelspruit"]},
    {name:"South Korea", code:"+82", cities:["Seoul","Busan","Incheon","Daegu","Daejeon","Gwangju","Suwon","Ulsan","Changwon","Seongnam"]},
    {name:"South Sudan", code:"+211", cities:["Juba","Malakal","Wau","Yei","Yambio","Aweil","Rumbek","Bor","Torit","Bentiu"]},
    {name:"Spain", code:"+34", cities:["Madrid","Barcelona","Valencia","Seville","Zaragoza","Malaga","Murcia","Palma","Las Palmas","Bilbao"]},
    {name:"Sri Lanka", code:"+94", cities:["Colombo","Kandy","Galle","Jaffna","Negombo","Anuradhapura","Trincomalee","Batticaloa","Ratnapura","Matara"]},
    {name:"Sudan", code:"+249", cities:["Khartoum","Omdurman","Port Sudan","Kassala","Nyala","El Obeid","Wad Madani","Al Qadarif","Ad Damazin","Geneina"]},
    {name:"Suriname", code:"+597", cities:["Paramaribo","Lelydorp","Nieuw Nickerie","Moengo","Albina","Brownsweg","Brokopondo","Totness"]},
    {name:"Sweden", code:"+46", cities:["Stockholm","Gothenburg","Malmo","Uppsala","Vasteras","Orebro","Linkoping","Helsingborg","Jonkoping","Norrkoping"]},
    {name:"Switzerland", code:"+41", cities:["Zurich","Geneva","Basel","Bern","Lausanne","Winterthur","Lucerne","St. Gallen","Lugano","Biel"]},
    {name:"Syria", code:"+963", cities:["Damascus","Aleppo","Homs","Latakia","Hama","Raqqa","Deir ez-Zor","Hasakah","Qamishli","Tartus"]},
    {name:"Taiwan", code:"+886", cities:["Taipei","Kaohsiung","Taichung","Tainan","Hsinchu","Keelung","Chiayi","Changhua","Pingtung","Taitung"]},
    {name:"Tajikistan", code:"+992", cities:["Dushanbe","Khujand","Kulob","Qurghonteppa","Istaravshan","Khorugh","Panjakent","Tursunzoda","Konibodom","Isfara"]},
    {name:"Tanzania", code:"+255", cities:["Dar es Salaam","Dodoma","Mwanza","Arusha","Mbeya","Morogoro","Tanga","Zanzibar City","Moshi","Tabora"]},
    {name:"Thailand", code:"+66", cities:["Bangkok","Chiang Mai","Phuket","Pattaya","Nakhon Ratchasima","Khon Kaen","Hat Yai","Udon Thani","Nonthaburi","Chonburi"]},
    {name:"Timor-Leste", code:"+670", cities:["Dili","Baucau","Maliana","Same","Suai","Lospalos","Viqueque","Ermera"]},
    {name:"Togo", code:"+228", cities:["Lome","Sokode","Kara","Kpalime","Atakpame","Dapaong","Tsevie","Anie","Notse","Bassar"]},
    {name:"Trinidad and Tobago", code:"+1", cities:["Port of Spain","San Fernando","Chaguanas","Arima","Point Fortin","Scarborough","Tunapuna","Sangre Grande"]},
    {name:"Tunisia", code:"+216", cities:["Tunis","Sfax","Sousse","Kairouan","Bizerte","Gabes","Ariana","Gafsa","La Marsa","Monastir"]},
    {name:"Turkey", code:"+90", cities:["Istanbul","Ankara","Izmir","Bursa","Adana","Gaziantep","Konya","Antalya","Diyarbakir","Mersin"]},
    {name:"Turkmenistan", code:"+993", cities:["Ashgabat","Turkmenabat","Dasoguz","Mary","Balkanabat","Tejen","Turkmenbashi","Abadan","Atamyrat","Govurdak"]},
    {name:"Uganda", code:"+256", cities:["Kampala","Gulu","Lira","Mbarara","Jinja","Entebbe","Mbale","Masaka","Fort Portal","Arua"]},
    {name:"Ukraine", code:"+380", cities:["Kyiv","Kharkiv","Odesa","Dnipro","Lviv","Zaporizhzhia","Kryvyi Rih","Mykolaiv","Vinnytsia","Poltava"]},
    {name:"United Arab Emirates", code:"+971", cities:["Dubai","Abu Dhabi","Sharjah","Ajman","Ras Al Khaimah","Fujairah","Umm Al Quwain","Al Ain","Khor Fakkan","Dibba"]},
    {name:"United Kingdom", code:"+44", cities:["London","Birmingham","Manchester","Glasgow","Liverpool","Leeds","Sheffield","Edinburgh","Bristol","Newcastle"]},
    {name:"United States", code:"+1", cities:["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","Austin"]},
    {name:"Uruguay", code:"+598", cities:["Montevideo","Salto","Paysandu","Las Piedras","Rivera","Maldonado","Tacuarembo","Melo","Artigas","Mercedes"]},
    {name:"Uzbekistan", code:"+998", cities:["Tashkent","Samarkand","Bukhara","Namangan","Andijan","Nukus","Fergana","Qarshi","Kokand","Margilan"]},
    {name:"Vatican City", code:"+379", cities:["Vatican City"]},
    {name:"Venezuela", code:"+58", cities:["Caracas","Maracaibo","Valencia","Barquisimeto","Ciudad Guayana","Barcelona","Maracay","San Cristobal","Merida","Cumana"]},
    {name:"Vietnam", code:"+84", cities:["Hanoi","Ho Chi Minh City","Da Nang","Haiphong","Can Tho","Bien Hoa","Hue","Nha Trang","Buon Ma Thuot","Vung Tau"]},
    {name:"Yemen", code:"+967", cities:["Sanaa","Aden","Taiz","Al Hudaydah","Ibb","Mukalla","Seiyun","Zinjibar","Dhamar","Sayyan"]},
    {name:"Zambia", code:"+260", cities:["Lusaka","Kitwe","Ndola","Kabwe","Chingola","Livingstone","Mufulira","Luanshya","Kasama","Chipata"]},
    {name:"Zimbabwe", code:"+263", cities:["Harare","Bulawayo","Chitungwiza","Mutare","Gweru","Kwekwe","Kadoma","Masvingo","Chinhoyi","Marondera"]}
];

// ========== دوال الترجمة ==========
let currentLang = 'en';

// تحميل اللغة من Firestore عند بدء التشغيل
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function(doc) {
      if (doc.exists && doc.data().lang) {
        currentLang = doc.data().lang;
        applyTranslations();
      }
    }).catch(function() {});
  }
});

const translations = {
    en: {
        loginFirst: "Please login first", alreadyFav: "Already in favorites", addedToFav: "Added to favorites", copied: "Copied!", error: "Error",
        enterDescription: "Please enter a description", reportSaved: "Report saved", reportDeleted: "Report deleted", confirmDelete: "Are you sure?",
        noItems: "No items", noMatches: "No matches", potentialMatches: "Potential Matches", foundMatches: "Matches found!", newMatchFound: "New match found",
        matches: "matches", views: "views", justNow: "just now", minutesAgo: "min ago", hoursAgo: "hours ago", daysAgo: "days ago",
        investigator: "Investigator", expert: "Expert", helper: "Helper", beginner: "Beginner", newBadge: "New", urgentReport: "Urgent", featuredReport: "Featured",
        open: "Open", inReview: "In Review", resolved: "Resolved", invalid: "Invalid", searchLost: "Search lost items", searchFound: "Search found items",
        allCountries: "All Countries", allCities: "All Cities", all: "All", lost: "Lost", found: "Found", match: "Match", noResults: "No results",
        totalLost: "Total Lost", totalFound: "Total Found", totalMatches: "Total Matches", totalUsers: "Total Users", pending: "Pending", noPending: "No pending requests",
        userRegRequests: "User Registration Requests", approvedUsers: "Approved Users", subAdmins: "Sub Admins", noSubAdmins: "No sub admins",
        subAdminName: "Sub Admin Name", subAdminEmail: "Sub Admin Email", subAdminPhone: "Sub Admin Phone", subAdminPassword: "Sub Admin Password",
        addSubAdmin: "Add Sub Admin", removeSubAdmin: "Remove Sub Admin", sendToAll: "Send to All", writeMessage: "Write a message", send: "Send",
        allItems: "All Items", delete: "Delete", activityLogs: "Activity Logs", adminSettings: "Admin Settings", changeName: "Change Name",
        changePassword: "Change Password", currentPassword: "Current Password", newPassword: "New Password", newName: "New Name",
        nameChanged: "Name changed", passwordChanged: "Password changed", wrongPassword: "Wrong password", details: "Details", sendMessage: "Send Message",
        ban: "Ban", userApproved: "User approved", userRejected: "User rejected", userBanned: "User banned", confirmBan: "Are you sure?", messageSent: "Message sent",
        logout: "Logged out", accountPending: "Account Pending", unauthorized: "Unauthorized", adminOnly: "Admin only", invalidCredentials: "Invalid credentials",
        regSent: "Registration submitted", orgRegSent: "Registration submitted", success: "Success", formCleared: "Form cleared", posterGenerated: "PDF generated",
        backupExported: "Backup exported", restored: "Data restored", invalidFile: "Invalid file", imported: "Data imported", premiumActivated: "Premium activated",
        notifications: "Notifications", noNotifications: "No notifications", fromAdmin: "From Admin", joinDate: "Join Date", earned: "Earned", points: "Points",
        dailyReports: "Daily Reports", mostActiveCountry: "Most Active Country", reports: "reports", category: "Category", exportReport: "Export Report",
        locationNotSupported: "Location not supported", linkCopied: "Link copied", user: "User", email: "Email", phone: "Phone",
        dashboard: "Dashboard", login: "Login", register: "Register", appName: "Lost & Found Pro", appSlogan: "Find it, Report it, Get it back",
        liveMap: "Live global activity", welcome: "Welcome"
    },
    ar: {
        loginFirst: "الرجاء تسجيل الدخول أولاً", alreadyFav: "موجود في المفضلة", addedToFav: "تمت الإضافة للمفضلة", copied: "تم النسخ!", error: "خطأ",
        enterDescription: "الرجاء إدخال وصف", reportSaved: "تم حفظ البلاغ", reportDeleted: "تم حذف البلاغ", confirmDelete: "هل أنت متأكد؟",
        noItems: "لا توجد عناصر", noMatches: "لا توجد تطابقات", potentialMatches: "تطابقات محتملة", foundMatches: "تم العثور على تطابقات!", newMatchFound: "تم العثور على تطابق جديد",
        matches: "تطابقات", views: "مشاهدات", justNow: "الآن", minutesAgo: "دقيقة مضت", hoursAgo: "ساعة مضت", daysAgo: "يوم مضى",
        investigator: "محقق", expert: "خبير", helper: "مساعد", beginner: "مبتدئ", newBadge: "جديد", urgentReport: "عاجل", featuredReport: "مميز",
        open: "مفتوح", inReview: "قيد المراجعة", resolved: "تم الحل", invalid: "غير صالح", searchLost: "بحث عن مفقودات", searchFound: "بحث عن موجودات",
        allCountries: "كل الدول", allCities: "كل المدن", all: "الكل", lost: "مفقود", found: "موجود", match: "تطابق", noResults: "لا توجد نتائج",
        totalLost: "إجمالي المفقودات", totalFound: "إجمالي الموجودات", totalMatches: "إجمالي التطابقات", totalUsers: "إجمالي المستخدمين", pending: "قيد الانتظار", noPending: "لا توجد طلبات معلقة",
        userRegRequests: "طلبات تسجيل المستخدمين", approvedUsers: "المستخدمون المعتمدون", subAdmins: "المشرفون الفرعيون", noSubAdmins: "لا يوجد مشرفون فرعيون",
        subAdminName: "اسم المشرف", subAdminEmail: "بريد المشرف", subAdminPhone: "هاتف المشرف", subAdminPassword: "كلمة مرور المشرف",
        addSubAdmin: "إضافة مشرف", removeSubAdmin: "إزالة مشرف", sendToAll: "إرسال للجميع", writeMessage: "اكتب رسالة", send: "إرسال",
        allItems: "كل العناصر", delete: "حذف", activityLogs: "سجل النشاطات", adminSettings: "إعدادات المشرف", changeName: "تغيير الاسم",
        changePassword: "تغيير كلمة المرور", currentPassword: "كلمة المرور الحالية", newPassword: "كلمة مرور جديدة", newName: "اسم جديد",
        nameChanged: "تم تغيير الاسم", passwordChanged: "تم تغيير كلمة المرور", wrongPassword: "كلمة مرور خاطئة", details: "تفاصيل", sendMessage: "إرسال رسالة",
        ban: "حظر", userApproved: "تم اعتماد المستخدم", userRejected: "تم رفض المستخدم", userBanned: "تم حظر المستخدم", confirmBan: "هل أنت متأكد؟", messageSent: "تم إرسال الرسالة",
        logout: "تم تسجيل الخروج", accountPending: "حساب قيد الانتظار", unauthorized: "غير مصرح", adminOnly: "للمشرفين فقط", invalidCredentials: "بيانات غير صحيحة",
        regSent: "تم إرسال طلب التسجيل", orgRegSent: "تم إرسال طلب التسجيل", success: "نجاح", formCleared: "تم مسح النموذج", posterGenerated: "تم إنشاء PDF",
        backupExported: "تم تصدير النسخة الاحتياطية", restored: "تم استعادة البيانات", invalidFile: "ملف غير صالح", imported: "تم استيراد البيانات", premiumActivated: "تم تفعيل البرميوم",
        notifications: "إشعارات", noNotifications: "لا توجد إشعارات", fromAdmin: "من المشرف", joinDate: "تاريخ الانضمام", earned: "مكتسب", points: "نقاط",
        dailyReports: "التقارير اليومية", mostActiveCountry: "أكثر دولة نشاطاً", reports: "تقارير", category: "فئة", exportReport: "تصدير التقرير",
        locationNotSupported: "الموقع غير مدعوم", linkCopied: "تم نسخ الرابط", user: "مستخدم", email: "بريد", phone: "هاتف",
        dashboard: "لوحة التحكم", login: "تسجيل الدخول", register: "تسجيل", appName: "Lost & Found Pro", appSlogan: "اعثر عليه، بلغ عنه، استعده",
        liveMap: "نشاط عالمي مباشر", welcome: "مرحباً"
    },
    es: {
        loginFirst: "Inicia sesión primero", alreadyFav: "Ya en favoritos", addedToFav: "Añadido a favoritos", copied: "¡Copiado!", error: "Error",
        enterDescription: "Ingresa una descripción", reportSaved: "Reporte guardado", reportDeleted: "Reporte eliminado", confirmDelete: "¿Estás seguro?",
        noItems: "Sin elementos", noMatches: "Sin coincidencias", potentialMatches: "Coincidencias potenciales", foundMatches: "¡Coincidencias encontradas!", newMatchFound: "Nueva coincidencia",
        matches: "coincidencias", views: "vistas", justNow: "ahora mismo", minutesAgo: "min", hoursAgo: "horas", daysAgo: "días",
        investigator: "Investigador", expert: "Experto", helper: "Ayudante", beginner: "Principiante", newBadge: "Nuevo", urgentReport: "Urgente", featuredReport: "Destacado",
        open: "Abierto", inReview: "En revisión", resolved: "Resuelto", invalid: "Inválido", searchLost: "Buscar perdidos", searchFound: "Buscar encontrados",
        allCountries: "Todos los países", allCities: "Todas las ciudades", all: "Todo", lost: "Perdido", found: "Encontrado", match: "Coincidencia", noResults: "Sin resultados",
        totalLost: "Total Perdidos", totalFound: "Total Encontrados", totalMatches: "Total Coincidencias", totalUsers: "Total Usuarios", pending: "Pendiente", noPending: "Sin solicitudes",
        userRegRequests: "Solicitudes de registro", approvedUsers: "Usuarios aprobados", subAdmins: "Subadministradores", noSubAdmins: "Sin subadministradores",
        subAdminName: "Nombre", subAdminEmail: "Correo", subAdminPhone: "Teléfono", subAdminPassword: "Contraseña",
        addSubAdmin: "Añadir", removeSubAdmin: "Eliminar", sendToAll: "Enviar a todos", writeMessage: "Escribe un mensaje", send: "Enviar",
        allItems: "Todos los elementos", delete: "Eliminar", activityLogs: "Registro de actividad", adminSettings: "Configuración", changeName: "Cambiar nombre",
        changePassword: "Cambiar contraseña", currentPassword: "Contraseña actual", newPassword: "Nueva contraseña", newName: "Nuevo nombre",
        nameChanged: "Nombre cambiado", passwordChanged: "Contraseña cambiada", wrongPassword: "Contraseña incorrecta", details: "Detalles", sendMessage: "Enviar mensaje",
        ban: "Prohibir", userApproved: "Usuario aprobado", userRejected: "Usuario rechazado", userBanned: "Usuario prohibido", confirmBan: "¿Confirmar?", messageSent: "Mensaje enviado",
        logout: "Cerrado sesión", accountPending: "Cuenta pendiente", unauthorized: "No autorizado", adminOnly: "Solo admin", invalidCredentials: "Credenciales inválidas",
        regSent: "Registro enviado", orgRegSent: "Registro enviado", success: "Éxito", formCleared: "Formulario limpiado", posterGenerated: "PDF generado",
        backupExported: "Copia exportada", restored: "Datos restaurados", invalidFile: "Archivo inválido", imported: "Datos importados", premiumActivated: "Premium activado",
        notifications: "Notificaciones", noNotifications: "Sin notificaciones", fromAdmin: "Del admin", joinDate: "Fecha de registro", earned: "Ganado", points: "Puntos",
        dailyReports: "Informes diarios", mostActiveCountry: "País más activo", reports: "informes", category: "Categoría", exportReport: "Exportar informe",
        locationNotSupported: "Ubicación no soportada", linkCopied: "Enlace copiado", user: "Usuario", email: "Correo", phone: "Teléfono",
        dashboard: "Panel", login: "Iniciar sesión", register: "Registrarse", appName: "Lost & Found Pro", appSlogan: "Encuéntralo, Repórtalo, Recupéralo",
        liveMap: "Actividad global en vivo", welcome: "Bienvenido"
    },
    fr: {
        loginFirst: "Veuillez vous connecter", alreadyFav: "Déjà en favoris", addedToFav: "Ajouté aux favoris", copied: "Copié !", error: "Erreur",
        enterDescription: "Veuillez entrer une description", reportSaved: "Signalement enregistré", reportDeleted: "Signalement supprimé", confirmDelete: "Êtes-vous sûr ?",
        noItems: "Aucun élément", noMatches: "Aucune correspondance", potentialMatches: "Correspondances potentielles", foundMatches: "Correspondances trouvées !", newMatchFound: "Nouvelle correspondance",
        matches: "correspondances", views: "vues", justNow: "à l'instant", minutesAgo: "min", hoursAgo: "heures", daysAgo: "jours",
        investigator: "Enquêteur", expert: "Expert", helper: "Assistant", beginner: "Débutant", newBadge: "Nouveau", urgentReport: "Urgent", featuredReport: "En vedette",
        open: "Ouvert", inReview: "En cours", resolved: "Résolu", invalid: "Invalide", searchLost: "Rechercher perdus", searchFound: "Rechercher trouvés",
        allCountries: "Tous les pays", allCities: "Toutes les villes", all: "Tout", lost: "Perdu", found: "Trouvé", match: "Correspondance", noResults: "Aucun résultat",
        totalLost: "Total Perdus", totalFound: "Total Trouvés", totalMatches: "Total Correspondances", totalUsers: "Total Utilisateurs", pending: "En attente", noPending: "Aucune demande",
        userRegRequests: "Demandes d'inscription", approvedUsers: "Utilisateurs approuvés", subAdmins: "Sous-admins", noSubAdmins: "Aucun sous-admin",
        subAdminName: "Nom", subAdminEmail: "Email", subAdminPhone: "Téléphone", subAdminPassword: "Mot de passe",
        addSubAdmin: "Ajouter", removeSubAdmin: "Retirer", sendToAll: "Envoyer à tous", writeMessage: "Écrire un message", send: "Envoyer",
        allItems: "Tous les éléments", delete: "Supprimer", activityLogs: "Journal d'activité", adminSettings: "Paramètres", changeName: "Changer nom",
        changePassword: "Changer mot de passe", currentPassword: "Mot de passe actuel", newPassword: "Nouveau mot de passe", newName: "Nouveau nom",
        nameChanged: "Nom changé", passwordChanged: "Mot de passe changé", wrongPassword: "Mot de passe incorrect", details: "Détails", sendMessage: "Envoyer message",
        ban: "Bannir", userApproved: "Utilisateur approuvé", userRejected: "Utilisateur rejeté", userBanned: "Utilisateur banni", confirmBan: "Confirmer ?", messageSent: "Message envoyé",
        logout: "Déconnecté", accountPending: "Compte en attente", unauthorized: "Non autorisé", adminOnly: "Admin seulement", invalidCredentials: "Identifiants invalides",
        regSent: "Inscription envoyée", orgRegSent: "Inscription envoyée", success: "Succès", formCleared: "Formulaire vidé", posterGenerated: "PDF généré",
        backupExported: "Sauvegarde exportée", restored: "Données restaurées", invalidFile: "Fichier invalide", imported: "Données importées", premiumActivated: "Premium activé",
        notifications: "Notifications", noNotifications: "Aucune notification", fromAdmin: "De l'admin", joinDate: "Date d'inscription", earned: "Gagné", points: "Points",
        dailyReports: "Rapports quotidiens", mostActiveCountry: "Pays le plus actif", reports: "rapports", category: "Catégorie", exportReport: "Exporter rapport",
        locationNotSupported: "Localisation non supportée", linkCopied: "Lien copié", user: "Utilisateur", email: "Email", phone: "Téléphone",
        dashboard: "Tableau de bord", login: "Connexion", register: "Inscription", appName: "Lost & Found Pro", appSlogan: "Trouvez-le, Signalez-le, Récupérez-le",
        liveMap: "Activité mondiale en direct", welcome: "Bienvenue"
    },
    zh: {
        loginFirst: "请先登录", alreadyFav: "已在收藏中", addedToFav: "已加入收藏", copied: "已复制！", error: "错误",
        enterDescription: "请输入描述", reportSaved: "报告已保存", reportDeleted: "报告已删除", confirmDelete: "确定吗？",
        noItems: "暂无项目", noMatches: "无匹配", potentialMatches: "潜在匹配", foundMatches: "找到匹配！", newMatchFound: "发现新匹配",
        matches: "匹配", views: "查看", justNow: "刚刚", minutesAgo: "分钟前", hoursAgo: "小时前", daysAgo: "天前",
        investigator: "调查员", expert: "专家", helper: "助手", beginner: "新手", newBadge: "新", urgentReport: "紧急", featuredReport: "精选",
        open: "开放", inReview: "审核中", resolved: "已解决", invalid: "无效", searchLost: "搜索失物", searchFound: "搜索拾物",
        allCountries: "所有国家", allCities: "所有城市", all: "全部", lost: "失物", found: "拾物", match: "匹配", noResults: "无结果",
        totalLost: "失物总数", totalFound: "拾物总数", totalMatches: "匹配总数", totalUsers: "用户总数", pending: "待处理", noPending: "无待处理请求",
        userRegRequests: "用户注册请求", approvedUsers: "已批准用户", subAdmins: "副管理员", noSubAdmins: "无副管理员",
        subAdminName: "姓名", subAdminEmail: "邮箱", subAdminPhone: "电话", subAdminPassword: "密码",
        addSubAdmin: "添加", removeSubAdmin: "移除", sendToAll: "发送给所有人", writeMessage: "写消息", send: "发送",
        allItems: "所有项目", delete: "删除", activityLogs: "活动日志", adminSettings: "管理员设置", changeName: "更改姓名",
        changePassword: "更改密码", currentPassword: "当前密码", newPassword: "新密码", newName: "新姓名",
        nameChanged: "姓名已更改", passwordChanged: "密码已更改", wrongPassword: "密码错误", details: "详情", sendMessage: "发送消息",
        ban: "封禁", userApproved: "用户已批准", userRejected: "用户已拒绝", userBanned: "用户已封禁", confirmBan: "确认封禁？", messageSent: "消息已发送",
        logout: "已登出", accountPending: "账户待审核", unauthorized: "未授权", adminOnly: "仅管理员", invalidCredentials: "凭证无效",
        regSent: "注册已提交", orgRegSent: "注册已提交", success: "成功", formCleared: "表单已清空", posterGenerated: "PDF已生成",
        backupExported: "备份已导出", restored: "数据已恢复", invalidFile: "文件无效", imported: "数据已导入", premiumActivated: "高级版已激活",
        notifications: "通知", noNotifications: "无通知", fromAdmin: "来自管理员", joinDate: "加入日期", earned: "已赚取", points: "积分",
        dailyReports: "每日报告", mostActiveCountry: "最活跃国家", reports: "报告", category: "类别", exportReport: "导出报告",
        locationNotSupported: "不支持定位", linkCopied: "链接已复制", user: "用户", email: "邮箱", phone: "电话",
        dashboard: "仪表板", login: "登录", register: "注册", appName: "失物招领专业版", appSlogan: "找到它，报告它，拿回它",
        liveMap: "全球实时动态", welcome: "欢迎"
    },
    it: {
        loginFirst: "Accedi prima", alreadyFav: "Già nei preferiti", addedToFav: "Aggiunto ai preferiti", copied: "Copiato!", error: "Errore",
        enterDescription: "Inserisci una descrizione", reportSaved: "Segnalazione salvata", reportDeleted: "Segnalazione eliminata", confirmDelete: "Sei sicuro?",
        noItems: "Nessun elemento", noMatches: "Nessuna corrispondenza", potentialMatches: "Corrispondenze potenziali", foundMatches: "Corrispondenze trovate!", newMatchFound: "Nuova corrispondenza",
        matches: "corrispondenze", views: "visualizzazioni", justNow: "adesso", minutesAgo: "min fa", hoursAgo: "ore fa", daysAgo: "giorni fa",
        investigator: "Investigatore", expert: "Esperto", helper: "Aiutante", beginner: "Principiante", newBadge: "Nuovo", urgentReport: "Urgente", featuredReport: "In evidenza",
        open: "Aperto", inReview: "In revisione", resolved: "Risolto", invalid: "Non valido", searchLost: "Cerca oggetti smarriti", searchFound: "Cerca oggetti trovati",
        allCountries: "Tutti i paesi", allCities: "Tutte le città", all: "Tutto", lost: "Smarrito", found: "Trovato", match: "Corrispondenza", noResults: "Nessun risultato",
        totalLost: "Totale Smarriti", totalFound: "Totale Trovati", totalMatches: "Totale Corrispondenze", totalUsers: "Totale Utenti", pending: "In attesa", noPending: "Nessuna richiesta",
        userRegRequests: "Richieste di registrazione", approvedUsers: "Utenti approvati", subAdmins: "Sotto-amministratori", noSubAdmins: "Nessun sotto-amministratore",
        subAdminName: "Nome", subAdminEmail: "Email", subAdminPhone: "Telefono", subAdminPassword: "Password",
        addSubAdmin: "Aggiungi", removeSubAdmin: "Rimuovi", sendToAll: "Invia a tutti", writeMessage: "Scrivi un messaggio", send: "Invia",
        allItems: "Tutti gli elementi", delete: "Elimina", activityLogs: "Registro attività", adminSettings: "Impostazioni", changeName: "Cambia nome",
        changePassword: "Cambia password", currentPassword: "Password attuale", newPassword: "Nuova password", newName: "Nuovo nome",
        nameChanged: "Nome cambiato", passwordChanged: "Password cambiata", wrongPassword: "Password errata", details: "Dettagli", sendMessage: "Invia messaggio",
        ban: "Bandisci", userApproved: "Utente approvato", userRejected: "Utente rifiutato", userBanned: "Utente bandito", confirmBan: "Confermi?", messageSent: "Messaggio inviato",
        logout: "Disconnesso", accountPending: "Account in attesa", unauthorized: "Non autorizzato", adminOnly: "Solo admin", invalidCredentials: "Credenziali non valide",
        regSent: "Registrazione inviata", orgRegSent: "Registrazione inviata", success: "Successo", formCleared: "Modulo pulito", posterGenerated: "PDF generato",
        backupExported: "Backup esportato", restored: "Dati ripristinati", invalidFile: "File non valido", imported: "Dati importati", premiumActivated: "Premium attivato",
        notifications: "Notifiche", noNotifications: "Nessuna notifica", fromAdmin: "Dall'admin", joinDate: "Data iscrizione", earned: "Guadagnato", points: "Punti",
        dailyReports: "Rapporti giornalieri", mostActiveCountry: "Paese più attivo", reports: "rapporti", category: "Categoria", exportReport: "Esporta rapporto",
        locationNotSupported: "Posizione non supportata", linkCopied: "Link copiato", user: "Utente", email: "Email", phone: "Telefono",
        dashboard: "Dashboard", login: "Accesso", register: "Registrati", appName: "Lost & Found Pro", appSlogan: "Trovalo, Segnalalo, Riprendilo",
        liveMap: "Attività globale in diretta", welcome: "Benvenuto"
    },
    de: {
        loginFirst: "Bitte zuerst anmelden", alreadyFav: "Bereits in Favoriten", addedToFav: "Zu Favoriten hinzugefügt", copied: "Kopiert!", error: "Fehler",
        enterDescription: "Bitte Beschreibung eingeben", reportSaved: "Meldung gespeichert", reportDeleted: "Meldung gelöscht", confirmDelete: "Sind Sie sicher?",
        noItems: "Keine Einträge", noMatches: "Keine Übereinstimmungen", potentialMatches: "Mögliche Übereinstimmungen", foundMatches: "Übereinstimmungen gefunden!", newMatchFound: "Neue Übereinstimmung",
        matches: "Übereinstimmungen", views: "Aufrufe", justNow: "gerade eben", minutesAgo: "Min. vor", hoursAgo: "Std. vor", daysAgo: "Tage vor",
        investigator: "Ermittler", expert: "Experte", helper: "Helfer", beginner: "Anfänger", newBadge: "Neu", urgentReport: "Dringend", featuredReport: "Vorgestellt",
        open: "Offen", inReview: "In Prüfung", resolved: "Gelöst", invalid: "Ungültig", searchLost: "Verlorenes suchen", searchFound: "Gefundenes suchen",
        allCountries: "Alle Länder", allCities: "Alle Städte", all: "Alle", lost: "Verloren", found: "Gefunden", match: "Übereinstimmung", noResults: "Keine Ergebnisse",
        totalLost: "Gesamt Verloren", totalFound: "Gesamt Gefunden", totalMatches: "Gesamt Übereinstimmungen", totalUsers: "Gesamt Benutzer", pending: "Ausstehend", noPending: "Keine Anfragen",
        userRegRequests: "Benutzerregistrierungen", approvedUsers: "Genehmigte Benutzer", subAdmins: "Unter-Administratoren", noSubAdmins: "Keine Unter-Admins",
        subAdminName: "Name", subAdminEmail: "E-Mail", subAdminPhone: "Telefon", subAdminPassword: "Passwort",
        addSubAdmin: "Hinzufügen", removeSubAdmin: "Entfernen", sendToAll: "An alle senden", writeMessage: "Nachricht schreiben", send: "Senden",
        allItems: "Alle Einträge", delete: "Löschen", activityLogs: "Aktivitätsprotokoll", adminSettings: "Einstellungen", changeName: "Name ändern",
        changePassword: "Passwort ändern", currentPassword: "Aktuelles Passwort", newPassword: "Neues Passwort", newName: "Neuer Name",
        nameChanged: "Name geändert", passwordChanged: "Passwort geändert", wrongPassword: "Falsches Passwort", details: "Details", sendMessage: "Nachricht senden",
        ban: "Sperren", userApproved: "Benutzer genehmigt", userRejected: "Benutzer abgelehnt", userBanned: "Benutzer gesperrt", confirmBan: "Bestätigen?", messageSent: "Nachricht gesendet",
        logout: "Abgemeldet", accountPending: "Konto ausstehend", unauthorized: "Nicht autorisiert", adminOnly: "Nur Admin", invalidCredentials: "Ungültige Anmeldedaten",
        regSent: "Registrierung gesendet", orgRegSent: "Registrierung gesendet", success: "Erfolg", formCleared: "Formular geleert", posterGenerated: "PDF erstellt",
        backupExported: "Backup exportiert", restored: "Daten wiederhergestellt", invalidFile: "Ungültige Datei", imported: "Daten importiert", premiumActivated: "Premium aktiviert",
        notifications: "Benachrichtigungen", noNotifications: "Keine Benachrichtigungen", fromAdmin: "Vom Admin", joinDate: "Beitrittsdatum", earned: "Verdient", points: "Punkte",
        dailyReports: "Tägliche Berichte", mostActiveCountry: "Aktivstes Land", reports: "Berichte", category: "Kategorie", exportReport: "Bericht exportieren",
        locationNotSupported: "Standort nicht unterstützt", linkCopied: "Link kopiert", user: "Benutzer", email: "E-Mail", phone: "Telefon",
        dashboard: "Dashboard", login: "Anmelden", register: "Registrieren", appName: "Lost & Found Pro", appSlogan: "Finden, Melden, Zurückbekommen",
        liveMap: "Globale Live-Aktivität", welcome: "Willkommen"
    }
};
function t(key) { return (translations[currentLang] && translations[currentLang][key]) || (translations['en'][key]) || key; }

function setLang(lang) {
  currentLang = lang;
  // حفظ اللغة في Firestore
  if (firebase.auth().currentUser) {
    db.collection('users').doc(firebase.auth().currentUser.uid).update({
      lang: lang
    }).catch(function() {});
  }
  translatePage();
}

function getLang() { return currentLang; }

function translatePage() { document.querySelectorAll('[data-t]').forEach(el => { const key = el.getAttribute('data-t'); if (key && t(key)) el.innerText = t(key); }); }
// ========== دوال مساعدة ==========
function showToast(msg, type='success') { let toast = document.createElement('div'); toast.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:${type==='success'?'#27ae60':type==='error'?'#e74c3c':'#f0a500'};color:white;padding:12px 24px;border-radius:40px;font-size:14px;font-weight:bold;z-index:10000;box-shadow:0 8px 24px rgba(0,0,0,0.3);`; toast.innerText = msg; document.body.appendChild(toast); setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000); }
function showAlert(title, text, icon='success') { Swal.fire({ title, text, icon, confirmButtonColor: '#1a237e' }); }
function escapeHtml(str) { return String(str || '').replace(/[&<>]/g, m => m==='&'?'&amp;':m==='<'?'&lt;':'>'); }
function copyToClipboard(text) { navigator.clipboard.writeText(text).then(()=>showToast(t('copied'))).catch(()=>showToast(t('error'),'error')); }
function isSimilar(a, b) { if(!a||!b) return false; let wa=a.toLowerCase().split(/\s+/), wb=b.toLowerCase().split(/\s+/); return wa.some(w=>w.length>2&&wb.includes(w)); }
function countMatches() { let c=0; for(let l of lostArray) for(let f of foundArray) if(l.city===f.city&&isSimilar(l.desc,f.desc)) c++; return c; }
function showMoneyField(checkbox, fieldId) { document.getElementById(fieldId).style.display = checkbox.checked ? "inline-block" : "none"; }
function timeAgo(timestamp) { let now = Date.now(); let then = new Date(timestamp).getTime(); let diff = Math.floor((now - then) / 1000); if (diff < 60) return t('justNow'); if (diff < 3600) return Math.floor(diff/60) + ' ' + t('minutesAgo'); if (diff < 86400) return Math.floor(diff/3600) + ' ' + t('hoursAgo'); return Math.floor(diff/86400) + ' ' + t('daysAgo'); }
function isNew(timestamp) { let now = Date.now(); let then = new Date(timestamp).getTime(); return (now - then) < 86400000; }
function getUserLevel(points) { if (points >= 1000) return t('investigator'); if (points >= 500) return t('expert'); if (points >= 100) return t('helper'); return t('beginner'); }

async function addPoints(userId, pts) {
    userPoints[userId] = (userPoints[userId] || 0) + pts;
    const db = firebase.firestore();
    await db.collection('userPoints').doc(userId).set({ userId, points: userPoints[userId] }, { merge: true });
}

async function addBalance(userId, amount) {
    userBalances[userId] = (userBalances[userId] || 0) + amount;
    const db = firebase.firestore();
    await db.collection('userBalances').doc(userId).set({ userId, balance: userBalances[userId] }, { merge: true });
}

async function addView(reportId) {
    reportViews[reportId] = (reportViews[reportId] || 0) + 1;
    const db = firebase.firestore();
    await db.collection('reportViews').doc(String(reportId)).set({ reportId, views: reportViews[reportId] }, { merge: true });
}

// ========== ضغط الصور ==========
function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) { height = (height * maxWidth) / width; width = maxWidth; }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
        };
    });
}

async function compressImages(files) {
    const compressed = [];
    if (!files || !files.length) return compressed;
    for (let i = 0; i < Math.min(files.length, 5); i++) {
        if (files[i] && files[i].type && files[i].type.startsWith('image/')) {
            const compressedData = await compressImage(files[i]);
            compressed.push(compressedData);
        }
    }
    return compressed;
}

// ========== إشعار سطح المكتب ==========
function sendDesktopNotification(title, body) {
    if ('Notification' in navigator && Notification.permission === 'granted') {
        new Notification(title, { body, icon: 'https://cdn-icons-png.flaticon.com/512/709/709722.png' });
    }
}
function playMatchSound() { let audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'); audio.play().catch(e => console.log("Sound error:", e)); }

// ========== دوال حفظ واسترجاع الفلتر (بدون localStorage) ==========
function saveFiltersToLocalStorage() {
    // الفلاتر تبقى في الذاكرة فقط أثناء الجلسة
}
function loadFiltersFromLocalStorage() {
    // الفلاتر تبدأ افتراضية
}

// ========== طباعة PDF ==========
function printReportAsPDF(desc, city, date, name, phone, type) {
    const element = document.createElement('div');
    element.style.padding = '20px'; element.style.fontFamily = 'Arial, sans-serif';
    element.style.direction = document.body.classList.contains('rtl-mode') ? 'rtl' : 'ltr';
    element.innerHTML = `<div style="text-align:center; margin-bottom:20px;"><h1 style="color:#1a237e;">📋 Lost & Found Pro</h1><h3>${type === 'lost' ? '🔴 Lost Item Report' : '🟢 Found Item Report'}</h3><hr></div><div style="margin-bottom:20px;"><p><strong>📝 Description:</strong> ${escapeHtml(desc)}</p><p><strong>📍 Location:</strong> ${escapeHtml(city)}</p><p><strong>📅 Date:</strong> ${escapeHtml(date)}</p><p><strong>👤 Reporter Name:</strong> ${escapeHtml(name)}</p><p><strong>📞 Phone:</strong> ${escapeHtml(phone)}</p><p><strong>🕐 Report Time:</strong> ${new Date().toLocaleString()}</p></div><hr><p style="font-size:12px; color:gray; text-align:center;">Generated by Lost & Found Pro - Official Report</p>`;
    document.body.appendChild(element);
    html2pdf().set({ margin: 0.5, filename: `${type}_report_${Date.now()}.pdf`, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } }).from(element).save().then(() => { document.body.removeChild(element); showToast(t('posterGenerated'), 'success'); });
}

async function sendMessageToReporter(reportId, reportType, reporterName, reporterEmail) {
    let msg = prompt(`📨 Send message to ${reporterName || reporterEmail}:`);
    if (!msg) return;
    let recipientId = reporterEmail;
    if (!recipientId) { showToast("لا يمكن إرسال الرسالة، معلومات المرسل غير متوفرة", 'error'); return; }
    
    // الحصول على المستخدم الحالي من Firebase Auth
    let senderName = 'مستخدم';
    const user = firebase.auth().currentUser;
    if (user) {
        const doc = await db.collection('users').doc(user.uid).get();
        if (doc.exists) {
            senderName = doc.data().name || doc.data().email || user.email || 'مستخدم';
        } else {
            senderName = user.displayName || user.email || 'مستخدم';
        }
    }
    
    let fullMsg = `📩 من: ${senderName}\n📝 الرسالة: ${msg}\n📎 بخصوص: ${reportType === 'lost' ? 'بلاغ مفقود' : 'بلاغ موجود'} (ID: ${reportId})`;

    const db = firebase.firestore();
    await db.collection('notifications').add({
        recipientId: recipientId,
        msg: fullMsg,
        timestamp: new Date().toISOString(),
        from: senderName,
        reportId: reportId,
        read: false
    });

    showToast(`✅ تم إرسال رسالتك إلى ${reporterName || reporterEmail}`, 'success');
}
// ========== حفظ واسترجاع البيانات ==========
async function loadSystemData() {
    const db = firebase.firestore();
    
    // قراءة lostArray من Firestore
    const lostSnap = await db.collection('lostItems').get();
    lostArray = [];
    lostSnap.forEach(doc => lostArray.push({ id: doc.id, ...doc.data() }));
    
    // قراءة foundArray من Firestore
    const foundSnap = await db.collection('foundItems').get();
    foundArray = [];
    foundSnap.forEach(doc => foundArray.push({ id: doc.id, ...doc.data() }));
    
    // قراءة users من Firestore
    const usersSnap = await db.collection('users').where('approved', '==', true).get();
    users = [];
    usersSnap.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
    
    // قراءة pendingUsers من Firestore
    const pendingSnap = await db.collection('pendingUsers').get();
    pendingUsers = [];
    pendingSnap.forEach(doc => pendingUsers.push({ id: doc.id, ...doc.data() }));
    
    // قراءة pendingReports من Firestore
    const reportsSnap = await db.collection('pendingReports').get();
    pendingReports = [];
    reportsSnap.forEach(doc => pendingReports.push({ id: doc.id, ...doc.data() }));
    
    // قراءة userPoints و userBalances من Firestore
    const pointsSnap = await db.collection('userPoints').get();
    userPoints = {};
    pointsSnap.forEach(doc => {
        const data = doc.data();
        userPoints[data.userId] = data.points || 0;
    });
    
    const balanceSnap = await db.collection('userBalances').get();
    userBalances = {};
    balanceSnap.forEach(doc => {
        const data = doc.data();
        userBalances[data.userId] = data.balance || 0;
    });
    
    // قراءة adminNotifications من Firestore
    const notifSnap = await db.collection('adminNotifications').get();
    adminNotifications = {};
    notifSnap.forEach(doc => {
        const data = doc.data();
        if (!adminNotifications[data.recipientId]) adminNotifications[data.recipientId] = [];
        adminNotifications[data.recipientId].push(data);
    });
    
    activityLogs = [];
    reportViews = {};
    pendingOrganizations = [];
    
    // جلب المستخدم الحالي من Firebase Auth
    const user = firebase.auth().currentUser;
    if (user) {
        const doc = await db.collection('users').doc(user.uid).get();
        if (doc.exists) {
            currentUser = { id: user.uid, ...doc.data() };
        } else {
            currentUser = { id: user.uid, email: user.email, name: user.displayName || user.email };
        }
    }
    
    // إنشاء الأدمن إذا لم يكن موجوداً
    if (!users.find(u => u.email === 'eyadrmh@system.com' || u.phone === '0000000')) {
        const adminUser = { id: 'admin', name: 'Eyad Admin', email: 'eyadrmh@system.com', phone: '0000000', password: 'eyadrmh1491979', approved: true, isAdmin: true, isSuperAdmin: true };
        users.push(adminUser);
        await db.collection('users').add(adminUser);
    }
    
    setTimeout(() => { initPublicMap(); }, 1000);
}

function addLog(action, user, details) { activityLogs.unshift({action,user,timestamp:new Date().toISOString(),details}); if(activityLogs.length>200) activityLogs.pop(); }

// ========== تحديث الواجهات ==========
function updateAllUI() { updateStats(); renderLists(); updateDashboardMap(); updateDashboardStats(); renderDashboardData(); updateQuickStats(); }
function updateQuickStats() { let qLost = document.getElementById('quickLostCount'), qFound = document.getElementById('quickFoundCount'), qMatch = document.getElementById('quickMatchCount'); if(qLost) qLost.innerText = lostArray.length; if(qFound) qFound.innerText = foundArray.length; if(qMatch) qMatch.innerText = countMatches(); }
function updateStats() { updateDashboardStats(); updateQuickStats(); }
function updateDashboardStats() {
    let m = countMatches(), today = new Date().toISOString().slice(0,10), lostToday = lostArray.filter(i=>i.date===today).length, foundToday = foundArray.filter(i=>i.date===today).length;
    let els = { dashStatLostCount: lostArray.length, dashStatFoundCount: foundArray.length, dashStatMatchCount: m, dashTodayCount: lostToday + foundToday, adminTotalLost: lostArray.length, adminTotalFound: foundArray.length, adminTotalMatches: m };
    for(let [id,val] of Object.entries(els)) { let el = document.getElementById(id); if(el) el.innerText = val; }
    let recoveryCount = document.getElementById('recoveryCount');
    if (recoveryCount) { let resolved = lostArray.filter(i => i.status === 'resolved').length + foundArray.filter(i => i.status === 'resolved').length; recoveryCount.innerText = resolved; }
}

// ========== عرض القوائم ==========
function renderLists() { renderLostList(); renderFoundList(); attachItemEvents(); }

function renderItemsList(type) {
    let listId = type === 'lost' ? 'lostItemsList' : 'foundItemsList';
    let searchId = type === 'lost' ? 'searchLostInput' : 'searchFoundInput';
    let searchPlaceholder = type === 'lost' ? t('searchLost') : t('searchFound');
    let array = type === 'lost' ? lostArray : foundArray;
    let oppositeArray = type === 'lost' ? foundArray : lostArray;
    let emoji = type === 'lost' ? '🔴' : '🟢';
    let div = document.getElementById(listId);
    if(!div) return;
    
    let filteredArray = array;
    
    // الحصول على المستخدم الحالي من Firebase Auth
    const user = firebase.auth().currentUser;
    let isAdminFlag = false;
    if (user) {
        db.collection('users').doc(user.uid).get().then(function(doc) {
            if (doc.exists && doc.data().isAdmin) {
                isAdminFlag = true;
            }
        }).catch(function() {});
    }
    
    // إذا كان المستخدم عادي وليس أدمن، فلترة العناصر الخاصة به فقط
    if (user && !isAdminFlag) {
        let userId = user.email || user.phone || user.uid;
        filteredArray = array.filter(item => item.userEmail === userId || item.userId === user.uid);
    }
    
    if(filteredArray.length===0) { div.innerHTML=`<p style="color:var(--text-light);text-align:center;padding:20px;">${t('noItems')}</p>`; return; }
    let html = '';
    filteredArray.forEach(item=>{ if (item.mapExpiry && new Date() > new Date(item.mapExpiry)) return;
        let isBanned = users.find(u => (u.email === item.userEmail || u.phone === item.userEmail))?.banned;
        let matched = oppositeArray.some(o=>o.city===item.city&&isSimilar(item.desc,o.desc));
        let views = reportViews[item.id] || 0, isNewItem = isNew(item.timestamp), isUrgent = item.isUrgent || false, isFeatured = item.isFeatured || false;
        let cls = ''; if(matched) cls += ' matched'; if(isUrgent) cls += ' urgent'; if(isFeatured) cls += ' featured'; if(item.reward?.money) cls += ' reward-item'; if(isBanned) cls += ' banned-item';
        let badges = ''; if(isNewItem) badges += `<span class="badge-new">🆕 ${t('newBadge')}</span> `; if(isUrgent) badges += `<span class="badge-urgent">🚨 ${t('urgentReport')}</span> `; if(isFeatured) badges += `<span class="badge-featured">📌 ${t('featuredReport')}</span> `; if(matched) badges += `<span class="badge-matched">🎯 Matched</span> `; if(item.reward?.money && item.reward?.moneyAmount) badges += `<span class="badge-reward">💰 $${item.reward.moneyAmount}</span> `; if(isBanned) badges += `<span class="badge-banned">🚫 محظور</span> `;
        html += `<div class="saved-item ${cls}" data-id="${item.id}" data-type="${type}" onclick="addView('${item.id}')"><div style="flex:1;"><strong>${emoji} ${escapeHtml(item.desc)}</strong><div style="margin:4px 0;">${badges}</div><small>📍 ${item.city} | <span class="time-ago">${timeAgo(item.timestamp)}</span> | 👁️ <span class="views-count">${views} ${t('views')}</span></small><br><select class="status-select modern-select" data-id="${item.id}" data-type="${type}" style="margin-top:4px;" onclick="event.stopPropagation();"><option value="open" ${item.status==='open'?'selected':''}>${t('open')}</option><option value="in_review" ${item.status==='in_review'?'selected':''}>${t('inReview')}</option><option value="resolved" ${item.status==='resolved'?'selected':''}>${t('resolved')}</option><option value="invalid" ${item.status==='invalid'?'selected':''}>${t('invalid')}</option></select>${item.images?`<div class="image-preview-area">${item.images.map(img=>`<img src="${img}">`).join('')}</div>`:''}</div><div style="display:flex;gap:4px;flex-wrap:wrap;" onclick="event.stopPropagation();"><button class="btn-sm editItem" data-id="${item.id}" data-type="${type}">✏️</button><button class="btn-sm btn-red delItem" data-id="${item.id}" data-type="${type}">🗑️</button><button class="btn-sm shareItem" data-desc="${escapeHtml(item.desc)}" data-city="${item.city}" data-date="${item.date}">📤</button><button class="btn-sm copyLinkBtn" data-id="${item.id}" data-type="${type}">🔗</button><button class="btn-sm qrItem" data-desc="${escapeHtml(item.desc)}" data-city="${item.city}" data-date="${item.date}">📱</button><button class="btn-sm favoriteBtn" data-id="${item.id}" data-type="${type}">⭐</button></div></div>`;
    });
    div.innerHTML = html + `<input type="text" class="modern-input" id="${searchId}" placeholder="${searchPlaceholder}" onkeyup="filterItems('${type}')" style="margin-top:10px;">`;
}

function renderLostList() { renderItemsList('lost'); }
function renderFoundList() { renderItemsList('found'); }

function attachItemEvents() {
    // الحصول على المستخدم الحالي من Firebase Auth
    const user = firebase.auth().currentUser;
    let userEmail = user ? user.email : 'user';
    
    document.querySelectorAll('.delItem').forEach(btn=>{ btn.onclick=async ()=>{ let id=parseInt(btn.dataset.id), type=btn.dataset.type; if(confirm(t('confirmDelete'))){ const db = firebase.firestore(); const coll = type === 'lost' ? 'lostItems' : 'foundItems'; const snap = await db.collection(coll).where('id', '==', id).get(); snap.forEach(async doc => await doc.ref.delete()); if(type==='lost') lostArray=lostArray.filter(i=>i.id!==id); else foundArray=foundArray.filter(i=>i.id!==id); updateAllUI(); addLog('Delete', userEmail, `Deleted ${type} item ${id}`); showToast(t('reportDeleted'),'error'); } }; });
    
    document.querySelectorAll('.editItem').forEach(btn=>{ btn.onclick=async ()=>{ let id=parseInt(btn.dataset.id), type=btn.dataset.type; let item=type==='lost'?lostArray.find(i=>i.id===id):foundArray.find(i=>i.id===id); if(item){ let nd=prompt('Edit description:',item.desc); if(nd) item.desc=nd; let dt=prompt('Edit date (YYYY-MM-DD):',item.date); if(dt) item.date=dt; let nc=prompt('Edit city:',item.city); if(nc) item.city=nc; const db = firebase.firestore(); const coll = type === 'lost' ? 'lostItems' : 'foundItems'; const snap = await db.collection(coll).where('id', '==', id).get(); snap.forEach(async doc => await doc.ref.update(item)); updateAllUI(); showToast('Updated!'); } }; });
    
    document.querySelectorAll('.shareItem').forEach(btn=>{ btn.onclick=()=>{ let text=`${btn.dataset.desc} - ${btn.dataset.city} - ${btn.dataset.date}`; if(navigator.share) navigator.share({title:'Lost & Found',text}); else copyToClipboard(text); }; });
    
    document.querySelectorAll('.copyLinkBtn').forEach(btn=>{ btn.onclick=()=>{ let id=btn.dataset.id, type=btn.dataset.type; let link = window.location.origin + window.location.pathname + `?report=${type}-${id}`; copyToClipboard(link); showToast(t('linkCopied')); }; });
    
    document.querySelectorAll('.qrItem').forEach(btn=>{ btn.onclick=()=>{ let text=`${btn.dataset.desc} - ${btn.dataset.city} - ${btn.dataset.date}`; document.getElementById('qrModal').style.display='flex'; document.getElementById('qrCode').innerHTML=''; new QRCode(document.getElementById('qrCode'),{text,width:128,height:128}); }; });
    
    document.querySelectorAll('.status-select').forEach(sel=>{ sel.onchange=async ()=>{ let id=parseInt(sel.dataset.id), type=sel.dataset.type, ns=sel.value; let item=type==='lost'?lostArray.find(i=>i.id===id):foundArray.find(i=>i.id===id); if(item){ item.status=ns; const db = firebase.firestore(); const coll = type === 'lost' ? 'lostItems' : 'foundItems'; const snap = await db.collection(coll).where('id', '==', id).get(); snap.forEach(async doc => await doc.ref.update({ status: ns })); updateAllUI(); if(ns==='resolved'){ const user = firebase.auth().currentUser; if(user) addPoints(user.uid, 50); } showToast(`Status: ${ns}`); } }; });
    
    document.querySelectorAll('.favoriteBtn').forEach(btn=>{ btn.onclick=()=>addToFavorites(parseInt(btn.dataset.id),btn.dataset.type); });
    
    document.querySelectorAll('.contactBtn').forEach(btn => { btn.onclick = (e) => { e.stopPropagation(); let id = parseInt(btn.dataset.id), type = btn.dataset.type, name = btn.dataset.name, email = btn.dataset.email; sendMessageToReporter(id, type, name, email); }; });
}

function filterItems(type) { let search = document.getElementById(type==='lost'?'searchLostInput':'searchFoundInput'); if(!search) return; let q = search.value.toLowerCase(); let items = document.querySelectorAll(`.saved-item[data-type="${type}"]`); items.forEach(div=>{ div.style.display = div.innerText.toLowerCase().includes(q) ? 'flex' : 'none'; }); }
// ========== الخرائط ==========
async function updateDashboardMap() {
    await refreshDataFromFirestore();
    if (dashboardMap) { dashboardMap.off(); dashboardMap.remove(); dashboardMap = null; }
    if (!document.getElementById('dashboardMap')) return;
    dashboardMap = L.map('dashboardMap').setView([20, 0], 2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OSM' }).addTo(dashboardMap);
    
    let now = Date.now();
    let weekMs = 7 * 24 * 60 * 60 * 1000;
    let yearMs = 365 * 24 * 60 * 60 * 1000;
    
    // جلب المستخدمين المحظورين من Firestore
    let bannedUsers = [];
    const usersSnap = await db.collection('users').where('banned', '==', true).get();
    usersSnap.forEach(doc => {
        const data = doc.data();
        bannedUsers.push(data.email || data.phone);
    });
    
    var lostIconNormal = L.divIcon({className:'', html:"<div style='background:#e74c3c;color:white;border-radius:50%;width:24px;height:24px;text-align:center;line-height:24px;font-weight:bold;'>L</div>", iconSize:[24,24], popupAnchor:[0,-12]});
    var lostIconGlow = L.divIcon({className:'', html:"<div style='background:#e74c3c;color:white;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-weight:bold;font-size:16px;animation: pulse 2s infinite;box-shadow: 0 0 8px #e74c3c;'>L</div>", iconSize:[28,28], popupAnchor:[0,-14]});
    var foundIconNormal = L.divIcon({className:'', html:"<div style='background:#27ae60;color:white;border-radius:50%;width:24px;height:24px;text-align:center;line-height:24px;font-weight:bold;'>F</div>", iconSize:[24,24], popupAnchor:[0,-12]});
    var foundIconGlow = L.divIcon({className:'', html:"<div style='background:#27ae60;color:white;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-weight:bold;font-size:16px;animation: pulse 2s infinite;box-shadow: 0 0 8px #27ae60;'>F</div>", iconSize:[28,28], popupAnchor:[0,-14]});
    var rewardIconGlow = L.divIcon({className:'', html:"<div style='background:#f0a500;color:white;border-radius:50%;width:34px;height:34px;text-align:center;line-height:34px;font-weight:bold;font-size:20px;animation: pulse 1s infinite;box-shadow: 0 0 14px #f0a500;'>$</div>", iconSize:[34,34], popupAnchor:[0,-17]});
    var rewardIconNormal = L.divIcon({className:'', html:"<div style='background:#f0a500;color:white;border-radius:50%;width:30px;height:30px;text-align:center;line-height:30px;font-weight:bold;font-size:18px;'>$</div>", iconSize:[30,30], popupAnchor:[0,-15]});
    var matchIcon = L.divIcon({className:'', html:"<div style='background:#8e44ad;color:white;border-radius:50%;width:24px;height:24px;text-align:center;line-height:24px;font-weight:bold;'>M</div>", iconSize:[24,24], popupAnchor:[0,-12]});

    let allItems = [];
    foundArray.forEach(item => { if (item.lat && item.lng && !bannedUsers.includes(item.userEmail)) allItems.push({...item, itemType: 'found'}); });
    lostArray.forEach(item => { if (item.lat && item.lng && !bannedUsers.includes(item.userEmail)) allItems.push({...item, itemType: 'lost'}); });
    
    let coordGroups = {};
    allItems.forEach(item => {
        let key = item.lat.toFixed(5) + ',' + item.lng.toFixed(5);
        if (!coordGroups[key]) coordGroups[key] = [];
        coordGroups[key].push(item);
    });
    
    Object.keys(coordGroups).forEach(key => {
        let items = coordGroups[key];
        let [baseLat, baseLng] = key.split(',').map(Number);
        
        items.forEach((item, i) => {
            let offsetLat = 0, offsetLng = 0;
            if (items.length > 1) {
                let angle = (i / items.length) * 360 * Math.PI / 180;
                let radius = 0.0004;
                offsetLat = Math.cos(angle) * radius;
                offsetLng = Math.sin(angle) * radius;
            }
            
            let itemTime = new Date(item.timestamp).getTime();
            let isReward = item.reward?.money;
            let isMatched = item.itemType === 'lost' && foundArray.some(f => f.city === item.city && isSimilar(item.desc, f.desc));
            
            let icon;
            if (isReward) {
                icon = (now - itemTime) < yearMs ? rewardIconGlow : rewardIconNormal;
            } else if (isMatched) {
                icon = matchIcon;
            } else if (item.itemType === 'lost') {
                icon = (now - itemTime) < weekMs ? lostIconGlow : lostIconNormal;
            } else {
                icon = (now - itemTime) < weekMs ? foundIconGlow : foundIconNormal;
            }
            
            let marker = L.marker([baseLat + offsetLat, baseLng + offsetLng], {icon: icon}).addTo(dashboardMap);
            let rewardText = isReward ? '<br>💰 $' + item.reward.moneyAmount : '';
            let typeLabel = item.itemType === 'lost' ? '🔴 Lost' : '✅ Found';
            marker.bindPopup(`<b>${typeLabel}:</b> ${escapeHtml(item.desc)}<br><small>📍 ${item.city} | ${timeAgo(item.timestamp)}</small>${isMatched ? '<br><span style="color:#8e44ad;font-weight:bold;">🎯 Matched!</span>' : ''}${rewardText}`);
        });
    });
    
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(p => { dashboardMap.setView([p.coords.latitude, p.coords.longitude], 13); L.marker([p.coords.latitude, p.coords.longitude]).bindPopup('📍 Your location').addTo(dashboardMap); });
}
async function refreshDataFromFirestore() {
    const db = firebase.firestore();
    let fSnap = await db.collection('foundItems').get();
    foundArray = fSnap.docs.map(d => d.data());
    let lSnap = await db.collection('lostItems').get();
    lostArray = lSnap.docs.map(d => d.data());
}
function initLostMap() { if (lostSelectMap) return; lostSelectMap = L.map('lostSelectMap').setView([30, 0], 2); L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OSM' }).addTo(lostSelectMap); lostSelectMap.on('click', e => { if (lostMarker) lostSelectMap.removeLayer(lostMarker); lostMarker = L.marker(e.latlng).addTo(lostSelectMap); document.getElementById('lostLat').value = e.latlng.lat.toFixed(6); document.getElementById('lostLng').value = e.latlng.lng.toFixed(6); }); }
function initFoundMap() { if (foundSelectMap) return; foundSelectMap = L.map('foundSelectMap').setView([30, 0], 2); L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OSM' }).addTo(foundSelectMap); foundSelectMap.on('click', e => { if (foundMarker) foundSelectMap.removeLayer(foundMarker); foundMarker = L.marker(e.latlng).addTo(foundSelectMap); document.getElementById('foundLat').value = e.latlng.lat.toFixed(6); document.getElementById('foundLng').value = e.latlng.lng.toFixed(6); }); }

// ========== تعبئة الدول والمدن ==========
function fillPhoneCodes() { document.querySelectorAll('.phone-code').forEach(sel => { sel.innerHTML = '<option value="">--</option>'; geoData.forEach(c => sel.add(new Option(c.name + ' (' + c.code + ')', c.code))); }); }
function initCountries() { document.querySelectorAll('.country-select').forEach(sel => { geoData.forEach(c => sel.add(new Option(c.name, c.name))); }); function fillCities(sc, tc) { let country = sc.value; let cities = geoData.find(c => c.name === country)?.cities || []; let cs = document.getElementById(tc); if (cs) { cs.innerHTML = '<option value="">-- Select City --</option>'; cities.forEach(c => cs.add(new Option(c, c))); } } let lc = document.getElementById('lostCountry'), fc = document.getElementById('foundCountry'); if (lc) { lc.onchange = () => fillCities(lc, 'lostCity'); fillCities(lc, 'lostCity'); } if (fc) { fc.onchange = () => fillCities(fc, 'foundCity'); fillCities(fc, 'foundCity'); } fillPhoneCodes(); }
function setupImagePreview(inputId, previewId) { let input = document.getElementById(inputId), preview = document.getElementById(previewId); if (!input) return; input.onchange = () => { preview.innerHTML = ''; Array.from(input.files).slice(0, 5).forEach(file => { let r = new FileReader(); r.onload = e => { let img = document.createElement('img'); img.src = e.target.result; preview.appendChild(img); }; r.readAsDataURL(file); }); }; }
// ========== حفظ البلاغات ==========
async function saveLost() {
    let desc = document.getElementById('lostDesc').value.trim();
    if (!desc) return showToast(t('enterDescription'), 'error');
    let date = document.getElementById('lostDate').value;
    let citySel = document.getElementById('lostCity');
    let city = citySel.options[citySel.selectedIndex]?.text || '';
    
    // الحصول على المستخدم الحالي من Firebase Auth
    const user = firebase.auth().currentUser;
    let userName = '';
    let userId = '';
    let isAdminFlag = false;
    
    if (user) {
        const doc = await db.collection('users').doc(user.uid).get();
        if (doc.exists) {
            const data = doc.data();
            userName = data.name || data.email || user.email || '';
            userId = data.email || data.phone || user.uid;
            isAdminFlag = data.isAdmin || false;
        } else {
            userName = user.displayName || user.email || '';
            userId = user.email || user.uid;
        }
    }
    
    let phoneCode1 = document.getElementById('lostPhoneCode').value;
    let phone1 = document.getElementById('lostPhone1').value;
    let phoneCode2 = document.getElementById('lostPhoneCode2').value;
    let phone2 = document.getElementById('lostPhone2').value;
    let phoneFull1 = phoneCode1 ? phoneCode1 + ' ' + phone1 : phone1;
    let phoneFull2 = phoneCode2 ? phoneCode2 + ' ' + phone2 : phone2;
    let lat = parseFloat(document.getElementById('lostLat').value) || null;
    let lng = parseFloat(document.getElementById('lostLng').value) || null;
    let isUrgent = document.getElementById('lostUrgent')?.checked || false;
    let isFeatured = document.getElementById('lostFeatured')?.checked || false;
    let tell = { rose: document.querySelector('#lostSection .tellRose')?.checked || false, thanks: document.querySelector('#lostSection .tellThanks')?.checked || false, invite: document.querySelector('#lostSection .tellInvite')?.checked || false };
    let notify = { police: document.querySelector('#lostSection .notifyPolice')?.checked || false, un: document.querySelector('#lostSection .notifyUN')?.checked || false, interpol: document.querySelector('#lostSection .notifyInterpol')?.checked || false, foreign: document.querySelector('#lostSection .notifyForeign')?.checked || false, record: document.querySelector('#lostSection .notifyRecord')?.checked || false };
    let images = [];
    let files = document.getElementById('lostImages').files;
    if (files && files.length > 0) { images = await compressImages(files); }
    let reward = { money: false, moneyAmount: null };
    let moneyCheck = document.querySelectorAll('.rewardMoneyCheck')[0];
    if (moneyCheck?.checked) { reward.money = true; reward.moneyAmount = document.getElementById('lost-money').value; }
    let mapExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    let newItem = { id: Date.now(), type: 'lost', desc, date, city, name: userName, phone1: phoneFull1, phone2: phoneFull2, images, lat, lng, category: selectedCategory, tell, notify, isUrgent, isFeatured, timestamp: new Date().toISOString(), userEmail: userId, reward, status: 'open', comments: [], mapExpiry: mapExpiry };
    
    const db = firebase.firestore();
    
    if (isAdminFlag) {
        lostArray.push(newItem);
        await db.collection('lostItems').add(newItem);
        showAlert(t('success'), t('reportSaved'));
    } else {
        await db.collection('pendingReports').add(newItem);
        showAlert(t('success'), "Report sent to admin for approval");
        if (document.getElementById('adminPanel') && !document.getElementById('adminPanel').classList.contains('hidden')) { refreshAdminPanel(); }
    }
    
    checkRealtimeMatch(newItem, 'lost');
    await addPoints(userId, 10);
    if (isUrgent) await addPoints(userId, 5);
    if (isFeatured) await addPoints(userId, 10);
    if (isUrgent) await addBalance(userId, 0.99);
    if (isFeatured) await addBalance(userId, 1.99);
    if (reward.money) await addBalance(userId, parseFloat(reward.moneyAmount) * 0.05 || 0);
    updateAllUI();
    clearLostForm();
    addLog('Add Lost', userId, desc);
    autoMatchAndNotify();
}

async function saveFound() {
    let desc = document.getElementById('foundDesc').value.trim();
    if (!desc) return showToast(t('enterDescription'), 'error');
    let date = document.getElementById('foundDate').value;
    let citySel = document.getElementById('foundCity');
    let city = citySel.options[citySel.selectedIndex]?.text || '';
    
    // الحصول على المستخدم الحالي من Firebase Auth
    const user = firebase.auth().currentUser;
    let userName = '';
    let userId = '';
    let isAdminFlag = false;
    
    if (user) {
        const doc = await db.collection('users').doc(user.uid).get();
        if (doc.exists) {
            const data = doc.data();
            userName = data.name || data.email || user.email || '';
            userId = data.email || data.phone || user.uid;
            isAdminFlag = data.isAdmin || false;
        } else {
            userName = user.displayName || user.email || '';
            userId = user.email || user.uid;
        }
    }
    
    let phoneCode1 = document.getElementById('foundPhoneCode').value;
    let phone1 = document.getElementById('foundPhone1').value;
    let phoneCode2 = document.getElementById('foundPhoneCode2').value;
    let phone2 = document.getElementById('foundPhone2').value;
    let phoneFull1 = phoneCode1 ? phoneCode1 + ' ' + phone1 : phone1;
    let phoneFull2 = phoneCode2 ? phoneCode2 + ' ' + phone2 : phone2;
    let lat = parseFloat(document.getElementById('foundLat').value) || null;
    let lng = parseFloat(document.getElementById('foundLng').value) || null;
    let isUrgent = document.getElementById('foundUrgent')?.checked || false;
    let isFeatured = document.getElementById('foundFeatured')?.checked || false;
    let tell = { rose: document.querySelector('#foundSection .tellRose')?.checked || false, thanks: document.querySelector('#foundSection .tellThanks')?.checked || false, invite: document.querySelector('#foundSection .tellInvite')?.checked || false };
    let notify = { police: document.querySelector('#foundSection .notifyPolice')?.checked || false, un: document.querySelector('#foundSection .notifyUN')?.checked || false, interpol: document.querySelector('#foundSection .notifyInterpol')?.checked || false, foreign: document.querySelector('#foundSection .notifyForeign')?.checked || false, record: document.querySelector('#foundSection .notifyRecord')?.checked || false };
    let images = [];
    let files = document.getElementById('foundImages').files;
    if (files && files.length > 0) { images = await compressImages(files); }
    let reward = { money: false, moneyAmount: null };
    let moneyCheck = document.querySelectorAll('.rewardMoneyCheck')[1];
    if (moneyCheck?.checked) { reward.money = true; reward.moneyAmount = document.getElementById('found-money').value; }
    let mapExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    let newItem = { id: Date.now(), type: 'found', desc, date, city, name: userName, phone1: phoneFull1, phone2: phoneFull2, images, lat, lng, category: selectedCategory, tell, notify, isUrgent, isFeatured, timestamp: new Date().toISOString(), userEmail: userId, reward, status: 'open', comments: [], mapExpiry: mapExpiry };
    
    const db = firebase.firestore();
    
    if (isAdminFlag) {
        foundArray.push(newItem);
        await db.collection('foundItems').add(newItem);
        showAlert(t('success'), t('reportSaved'));
    } else {
        await db.collection('pendingReports').add(newItem);
        showAlert(t('success'), "Report sent to admin for approval");
        if (document.getElementById('adminPanel') && !document.getElementById('adminPanel').classList.contains('hidden')) { refreshAdminPanel(); }
    }
    
    checkRealtimeMatch(newItem, 'found');
    await addPoints(userId, 15);
    if (isUrgent) await addPoints(userId, 5);
    if (isFeatured) await addPoints(userId, 10);
    if (isUrgent) await addBalance(userId, 0.99);
    if (isFeatured) await addBalance(userId, 1.99);
    if (reward.money) await addBalance(userId, parseFloat(reward.moneyAmount) * 0.05 || 0);
    updateAllUI();
    clearFoundForm();
    addLog('Add Found', userId, desc);
    autoMatchAndNotify();
}
function clearLostForm() { 
    document.getElementById('lostDesc').value = ''; 
    document.getElementById('lostImages').value = ''; 
    document.getElementById('lostImagePreview').innerHTML = '';  
    document.getElementById('lostPhone1').value = ''; 
    document.getElementById('lostPhone2').value = ''; 
    document.getElementById('lostDate').value = new Date().toISOString().slice(0, 10); 
    let lc = document.getElementById('lostCountry'), lci = document.getElementById('lostCity'); 
    if (lc) lc.selectedIndex = 0; 
    if (lci) lci.innerHTML = '<option value="">-- Select City --</option>'; 
    document.querySelectorAll('#lostSection input[type="checkbox"]').forEach(cb => { if(cb) cb.checked = false; }); 
    document.getElementById('lost-money').style.display = 'none'; 
    document.getElementById('lost-money').value = ''; 
    document.getElementById('lostLat').value = ''; 
    document.getElementById('lostLng').value = ''; 
    if (lostMarker && lostSelectMap) { lostSelectMap.removeLayer(lostMarker); lostMarker = null; } 
    if (lostSelectMap) lostSelectMap.setView([30, 0], 2); 
    document.querySelectorAll('#lostSection .chip').forEach(c => c.classList.remove('active')); 
    selectedCategory = 'other'; 
}

function clearFoundForm() { 
    document.getElementById('foundDesc').value = ''; 
    document.getElementById('foundImages').value = ''; 
    document.getElementById('foundImagePreview').innerHTML = '';  
    document.getElementById('foundPhone1').value = ''; 
    document.getElementById('foundPhone2').value = ''; 
    document.getElementById('foundDate').value = new Date().toISOString().slice(0, 10); 
    let fc = document.getElementById('foundCountry'), fci = document.getElementById('foundCity'); 
    if (fc) fc.selectedIndex = 0; 
    if (fci) fci.innerHTML = '<option value="">-- Select City --</option>'; 
    document.querySelectorAll('#foundSection input[type="checkbox"]').forEach(cb => { if(cb) cb.checked = false; }); 
    document.getElementById('found-money').style.display = 'none'; 
    document.getElementById('found-money').value = ''; 
    document.getElementById('foundLat').value = ''; 
    document.getElementById('foundLng').value = ''; 
    if (foundMarker && foundSelectMap) { foundSelectMap.removeLayer(foundMarker); foundMarker = null; } 
    if (foundSelectMap) foundSelectMap.setView([30, 0], 2); 
    document.querySelectorAll('#foundSection .chip').forEach(c => c.classList.remove('active')); 
    selectedCategory = 'other'; 
}

function saveAllDataToLocalStorage() {
    // Firestore هو المصدر الآن
}

function loadAllDataFromLocalStorage() {
    // Firestore هو المصدر الآن
}
function autoMatchAndNotify() {
    let matches = [];
    for (let l of lostArray) {
        for (let f of foundArray) {
            if (l.city === f.city && isSimilar(l.desc, f.desc)) { matches.push({ l, f }); }
        }
    }
    if (matches.length > 0) {
        showToast(`🎯 ${t('foundMatches')}`, 'info');
        sendDesktopNotification(t('newMatchFound'), `${matches.length} ${t('matches')}`);
        playMatchSound();
    }
}

function matchItems() { let results = []; for (let l of lostArray) for (let f of foundArray) if (isSimilar(l.desc, f.desc)) results.push({ l, f }); let div = document.getElementById('matchResults'); if (results.length === 0) div.innerHTML = `<p style="text-align:center;padding:20px;">${t('noMatches')}</p>`; else { let html = `<h4>${t('potentialMatches')}</h4>`; results.forEach(r => html += `<div class="saved-item"><div>🔴 Lost: ${escapeHtml(r.l.desc)}<br>🟢 Found: ${escapeHtml(r.f.desc)}<br><small>📍 ${r.l.city}</small></div></div>`); div.innerHTML = html; showToast(`🎯 ${results.length} ${t('matches')}!`, 'success'); } }
function toggleDarkMode() { document.body.classList.toggle('dark'); saveUserPrefs(); }
function saveUserPrefs() { /* تفضيلات محلية تبقى في الذاكرة */ }
function loadUserPrefs() { /* تفضيلات محلية تبقى في الذاكرة */ }

async function addToFavorites(id, type) {
    const user = firebase.auth().currentUser;
    if (!user) { showToast(t('loginFirst'), 'error'); return; }
    
    const db = firebase.firestore();
    const userId = user.email || user.phone || user.uid;
    
    const snap = await db.collection('favorites').where('userId', '==', userId).where('reportId', '==', id).get();
    if (!snap.empty) { showToast(t('alreadyFav'), 'info'); return; }
    await db.collection('favorites').add({ userId, reportId: id, type, timestamp: new Date().toISOString() });
    showToast(t('addedToFav'));
}

function renderDashboardData() {
    let category = document.getElementById('filterCategory')?.value || 'all';
    let country = document.getElementById('filterCountry')?.value || '';
    let city = document.getElementById('filterCity')?.value || '';
    let fLost = lostArray, fFound = foundArray;
    let timeFilter = document.getElementById('filterTime')?.value || 'all';
    
    // جلب المستخدمين المحظورين من Firestore
    let bannedUsers = [];
    db.collection('users').where('banned', '==', true).get().then(function(snapshot) {
        snapshot.forEach(function(doc) {
            const data = doc.data();
            bannedUsers.push(data.email || data.phone);
        });
    }).catch(function() {});
    
    if (category === 'reward') {
        fLost = fLost.filter(i => i.reward?.money);
        fFound = fFound.filter(i => i.reward?.money);
    }
    if (timeFilter === 'today') { let today = new Date().toISOString().slice(0, 10); fLost = fLost.filter(i => i.date === today); fFound = fFound.filter(i => i.date === today); }
    if (timeFilter === 'week') { let weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10); fLost = fLost.filter(i => i.date >= weekAgo); fFound = fFound.filter(i => i.date >= weekAgo); }
    if (country) { fLost = fLost.filter(i => i.city === country); fFound = fFound.filter(i => i.city === country); }
    if (city) { fLost = fLost.filter(i => i.city === city); fFound = fFound.filter(i => i.city === city); }
    let fMatches = 0;
    for (let l of fLost) for (let f of fFound) if (isSimilar(l.desc, f.desc)) fMatches++;
    let dashLost = document.getElementById('dashLost'), dashFound = document.getElementById('dashFound'), dashMatches = document.getElementById('dashMatches');
    
    if (category === 'all' || category === 'lost' || category === 'reward') {
        if (dashLost) dashLost.innerHTML = fLost.length === 0 ? `<p style="color:var(--text-light);">${t('noItems')}</p>` : fLost.slice().reverse().map(i => {
            let isBanned = bannedUsers.includes(i.userEmail);
            return `
            <div class="saved-item${isBanned ? ' banned-item' : ''}" style="border-left:4px solid var(--lost-color);">
                <div><strong>🔴 ${escapeHtml(i.desc)}</strong>${isBanned ? ' 🚫' : ''}${i.images && i.images.length > 0 ? `<img src="${i.images[0]}" style="width:50px;height:50px;border-radius:8px;object-fit:cover;margin-left:8px;float:right;">` : ''}<br><small>👤 ${escapeHtml(i.name)} | 📍 ${i.city} | 📅 ${i.date}</small></div>
                <div style="display:flex; gap:5px;">
                    <button class="btn-sm favoriteBtnSmall" data-id="${i.id}" data-type="lost">⭐</button>
                    <button class="btn-sm btn-teal printPdfBtn" data-desc="${escapeHtml(i.desc)}" data-city="${i.city}" data-date="${i.date}" data-name="${escapeHtml(i.name)}" data-phone="${escapeHtml(i.phone1)}" data-type="lost">🖨️ PDF</button>
                    <button class="btn-sm btn-yellow contactBtn" data-id="${i.id}" data-type="lost" data-name="${escapeHtml(i.name)}" data-email="${escapeHtml(i.userEmail)}">📨 Message</button>
                </div>
            </div>`;
        }).join('');
    } else if (dashLost) dashLost.innerHTML = `<p style="color:var(--text-light);">${t('all')} / ${t('lost')}</p>`;
    
    if (category === 'all' || category === 'found' || category === 'reward') {
        if (dashFound) dashFound.innerHTML = fFound.length === 0 ? `<p style="color:var(--text-light);">${t('noItems')}</p>` : fFound.slice().reverse().map(i => {
            let isBanned = bannedUsers.includes(i.userEmail);
            return `
            <div class="saved-item${isBanned ? ' banned-item' : ''}" style="border-left:4px solid var(--found-color);">
                <div><strong>🟢 ${escapeHtml(i.desc)}</strong>${isBanned ? ' 🚫' : ''}${i.images && i.images.length > 0 ? `<img src="${i.images[0]}" style="width:50px;height:50px;border-radius:8px;object-fit:cover;margin-left:8px;float:right;">` : ''}<br><small>👤 ${escapeHtml(i.name)} | 📍 ${i.city} | 📅 ${i.date}</small></div>
                <div style="display:flex; gap:5px;">
                    <button class="btn-sm favoriteBtnSmall" data-id="${i.id}" data-type="found">⭐</button>
                    <button class="btn-sm btn-teal printPdfBtn" data-desc="${escapeHtml(i.desc)}" data-city="${i.city}" data-date="${i.date}" data-name="${escapeHtml(i.name)}" data-phone="${escapeHtml(i.phone1)}" data-type="found">🖨️ PDF</button>
                    <button class="btn-sm btn-yellow contactBtn" data-id="${i.id}" data-type="found" data-name="${escapeHtml(i.name)}" data-email="${escapeHtml(i.userEmail)}">📨 Message</button>
                </div>
            </div>`;
        }).join('');
    } else if (dashFound) dashFound.innerHTML = `<p style="color:var(--text-light);">${t('all')} / ${t('found')}</p>`;
    
    if (category === 'all' || category === 'match') {
        if (dashMatches) {
            if (fMatches === 0) dashMatches.innerHTML = `<p style="color:var(--text-light);">${t('noMatches')}</p>`;
            else {
                let html = '';
                for (let l of fLost) for (let f of fFound) if (isSimilar(l.desc, f.desc)) {
                    let isBannedL = bannedUsers.includes(l.userEmail);
                    let isBannedF = bannedUsers.includes(f.userEmail);
                    html += `<div class="saved-item${(isBannedL || isBannedF) ? ' banned-item' : ''}" style="border-left:4px solid var(--match-color);"><div><strong>🔹 ${escapeHtml(l.desc)}</strong>${isBannedL ? ' 🚫' : ''} ↔ <strong>🔸 ${escapeHtml(f.desc)}</strong>${isBannedF ? ' 🚫' : ''}<br><small>📍 ${l.city}</small></div></div>`;
                }
                dashMatches.innerHTML = html;
            }
        }
    } else if (dashMatches) dashMatches.innerHTML = `<p style="color:var(--text-light);">${t('all')} / ${t('match')}</p>`;
    
    document.querySelectorAll('.favoriteBtnSmall').forEach(btn => { btn.onclick = () => addToFavorites(parseInt(btn.dataset.id), btn.dataset.type); });
    document.querySelectorAll('.printPdfBtn').forEach(btn => { btn.onclick = (e) => { e.stopPropagation(); printReportAsPDF(btn.dataset.desc, btn.dataset.city, btn.dataset.date, btn.dataset.name, btn.dataset.phone, btn.dataset.type); }; });
    document.querySelectorAll('.contactBtn').forEach(btn => { btn.onclick = (e) => { e.stopPropagation(); sendMessageToReporter(parseInt(btn.dataset.id), btn.dataset.type, btn.dataset.name, btn.dataset.email); }; });
}
async function loginUser(credential, pwd, isAdminLogin = false) {
    let user = null;
    
    if (typeof firebase !== 'undefined' && firebase.apps.length) {
        const db = firebase.firestore();
        const q = credential.includes('@') 
            ? db.collection('users').where('email', '==', credential)
            : db.collection('users').where('phone', '==', credential);
        const snap = await q.get();
        if (!snap.empty) {
            snap.forEach(doc => {
                const u = doc.data();
                if (u.password === pwd) user = { id: doc.id, ...u };
            });
        }
    }
    
    if (!user) { alert('❌ خطأ في الإيميل أو كلمة المرور'); return false; }
    if (!user.approved && !user.isAdmin) { alert('⏳ الحساب بانتظار الموافقة'); return false; }
    if (user.banned) { alert('🚫 تم حظر حسابك'); return false; }
    if (isAdminLogin && !user.isAdmin) { alert('👑 للأدمن فقط'); return false; }
    
    currentUser = user;
    isAdmin = user.isAdmin || false;
    
    // إخفاء صفحة الدخول بالإجبار
    const loginPage = document.getElementById('loginPage');
    loginPage.style.display = 'none';
    loginPage.style.visibility = 'hidden';
    loginPage.style.opacity = '0';
    loginPage.classList.add('hidden');
    
    if (isAdmin) {
        document.getElementById('dashboardPage').style.display = 'none';
        document.getElementById('dashboardPage').classList.add('hidden');
        
        const adminPanel = document.getElementById('adminPanel');
        adminPanel.style.display = 'block';
        adminPanel.style.visibility = 'visible';
        adminPanel.style.opacity = '1';
        adminPanel.classList.remove('hidden');
        
        refreshAdminPanel();
    } else {
        document.getElementById('adminPanel').style.display = 'none';
        document.getElementById('adminPanel').classList.add('hidden');
        
        const dashboardPage = document.getElementById('dashboardPage');
        dashboardPage.style.display = 'block';
        dashboardPage.style.visibility = 'visible';
        dashboardPage.style.opacity = '1';
        dashboardPage.classList.remove('hidden');
    }
    
    console.log('✅ دخول ناجح:', user.email, '| Admin:', isAdmin);
    return true;
}
// ربط أزرار تسجيل الدخول
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                const email = document.getElementById('loginEmail')?.value?.trim();
                const password = document.getElementById('loginPassword')?.value;
                if (email && password) {
                    loginUser(email, password);
                } else {
                    alert('أدخل الإيميل وكلمة المرور');
                }
            });
        }
    }, 500);
});
function logoutAdmin() {
    firebase.auth().signOut().then(function() {
        isAdmin = false;
        currentUser = null;
        document.getElementById('adminPanel').classList.add('hidden');
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('loginPage').style.display = 'block';
        showToast(t('logout'));
    }).catch(function() {
        isAdmin = false;
        currentUser = null;
        document.getElementById('adminPanel').classList.add('hidden');
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('loginPage').style.display = 'block';
        showToast(t('logout'));
    });
}

function logoutUser() {
    firebase.auth().signOut().then(function() {
        currentUser = null;
        document.getElementById('dashboardPage').classList.add('hidden');
        document.getElementById('mainApp').classList.add('hidden');
        document.getElementById('adminPanel').classList.add('hidden');
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('loginPage').style.display = 'block';
        showToast(t('logout'));
    }).catch(function() {
        currentUser = null;
        document.getElementById('dashboardPage').classList.add('hidden');
        document.getElementById('mainApp').classList.add('hidden');
        document.getElementById('adminPanel').classList.add('hidden');
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('loginPage').style.display = 'block';
        showToast(t('logout'));
    });
}

function showRegisterForm() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('orgRegisterForm').style.display = 'none';
}

function submitRegistration() {
    let name = document.getElementById('regName').value.trim();
    let email = document.getElementById('regEmail').value.trim();
    let pwd = document.getElementById('regPwd').value;
    let isEmail = email.includes('@') && email.includes('.');
    let isPhone = !isEmail && email.length >= 7;
    if (!name || !email || !pwd) return showAlert(t('error'), 'Please fill all fields', 'error');
    if (!isEmail && !isPhone) return showAlert(t('error'), 'Please enter a valid email or phone number', 'error');
    const db = firebase.firestore();
    db.collection('pendingUsers').add({
        name: name,
        email: isEmail ? email : '',
        phone: isPhone ? email : '',
        password: pwd,
        approved: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        showAlert(t('success'), t('regSent'));
        document.getElementById('registerForm').style.display = 'none';
        addLog('Registration Request', email, 'Pending approval');
    }).catch(function(error) {
        console.error('Error:', error);
        showAlert(t('error'), 'Registration failed.', 'error');
    });
}
// ========== تسجيل الجهات الرسمية ==========
function showOrgRegisterForm() {
    document.getElementById('orgRegisterForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function submitOrgRegistration() {
    let name = document.getElementById('orgName').value.trim();
    let type = document.getElementById('orgType').value;
    let email = document.getElementById('orgEmail').value.trim();
    let phone = document.getElementById('orgPhone').value.trim();
    let pwd = document.getElementById('orgPassword').value;
    
    if (!name || !pwd || (!email && !phone)) return showAlert(t('error'), 'Please fill all fields', 'error');
    
    const db = firebase.firestore();
    const orgData = {
        name: name,
        type: type,
        email: email,
        phone: phone,
        password: pwd,
        approved: false,
        isAdmin: false,
        isOrganization: true,
        isSuperAdmin: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('pendingOrganizations').add(orgData)
        .then(() => {
            showAlert(t('success'), t('orgRegSent'));
            document.getElementById('orgRegisterForm').style.display = 'none';
            addLog('Org Registration', email || phone, name);
        })
        .catch(function(error) {
            console.error('Error:', error);
            showAlert(t('error'), 'Organization registration failed.', 'error');
        });
}
// ==========================================
// 1. حذف أي تعريفات قديمة
// ==========================================
delete window.refreshAdminPanel;

// ==========================================
// 2. تعريف دالة لوحة الإدارة الكاملة
// ==========================================
window.refreshAdminPanel = async function() {
    const db = firebase.firestore();
    const [lostSnap, foundSnap, usersSnap, pendingSnap, reportsSnap, orgsSnap] = await Promise.all([
        db.collection('lostItems').get(),
        db.collection('foundItems').get(),
        db.collection('users').get(),
        db.collection('pendingUsers').get(),
        db.collection('pendingReports').get(),
        db.collection('pendingOrganizations').get()
    ]);

        const lostArray = [], foundArray = [], users = [], pendingUsers = [], pendingReports = [], pendingOrganizations = [];

    lostSnap.forEach(d => { const data = d.data(); lostArray.push({ id: d.id, desc: data.desc || data.tell?.desc || '', city: data.city || data.tell?.city || '', date: data.date || '', userEmail: data.userEmail || data.tell?.email || '' }); });
    foundSnap.forEach(d => { const data = d.data(); foundArray.push({ id: d.id, desc: data.desc || data.tell?.desc || '', city: data.city || data.tell?.city || '', date: data.date || '', userEmail: data.userEmail || data.tell?.email || '' }); });
    usersSnap.forEach(d => { const data = d.data(); users.push({ id: d.id, ...data, approved: data.approved !== false }); });
    pendingSnap.forEach(d => { const data = d.data(); pendingUsers.push({ id: d.id, ...data }); });
    reportsSnap.forEach(d => { const data = d.data(); pendingReports.push({ id: d.id, ...data }); });
    orgsSnap.forEach(d => { const data = d.data(); pendingOrganizations.push({ id: d.id, ...data }); });
    
    const approvedUsers = users.filter(u => u.approved !== false && !u.isAdmin);
    const subAdmins = users.filter(u => u.isAdmin && !u.isSuperAdmin);
    const allItems = [...lostArray.map(i => ({...i, itemType: 'lost'})), ...foundArray.map(i => ({...i, itemType: 'found'}))];

    let lostDaily = {}, foundDaily = {};
    lostArray.forEach(i => { let d = i.date || 'N/A'; lostDaily[d] = (lostDaily[d] || 0) + 1; });
    foundArray.forEach(i => { let d = i.date || 'N/A'; foundDaily[d] = (foundDaily[d] || 0) + 1; });
    let allDates = [...new Set([...Object.keys(lostDaily), ...Object.keys(foundDaily)])].sort();
    let last7Dates = allDates.slice(-7);
    let lost7 = last7Dates.map(d => lostDaily[d] || 0);
    let found7 = last7Dates.map(d => foundDaily[d] || 0);
    const container = document.getElementById('adminDynamicContent');
    if (!container) return;

    container.innerHTML = `
    <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:24px;">
        <div style="flex:1;min-width:130px;background:linear-gradient(135deg,#e74c3c,#c0392b);border-radius:16px;padding:18px;text-align:center;color:white;"><div style="font-size:32px;font-weight:800;">${lostArray.length}</div><small>📦 Total Lost</small></div>
        <div style="flex:1;min-width:130px;background:linear-gradient(135deg,#27ae60,#1e8449);border-radius:16px;padding:18px;text-align:center;color:white;"><div style="font-size:32px;font-weight:800;">${foundArray.length}</div><small>✅ Total Found</small></div>
        <div style="flex:1;min-width:130px;background:linear-gradient(135deg,#8e44ad,#6c3cb3);border-radius:16px;padding:18px;text-align:center;color:white;"><div style="font-size:32px;font-weight:800;">0</div><small>🎯 Total Matches</small></div>
        <div style="flex:1;min-width:130px;background:linear-gradient(135deg,#3498db,#2471a3);border-radius:16px;padding:18px;text-align:center;color:white;"><div style="font-size:32px;font-weight:800;">${approvedUsers.length}</div><small>👥 Total Users</small></div>
        <div style="flex:1;min-width:130px;background:linear-gradient(135deg,#f0a500,#d68910);border-radius:16px;padding:18px;text-align:center;color:white;"><div style="font-size:32px;font-weight:800;">${pendingUsers.length}</div><small>⏳ Pending</small></div>
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:24px;">
        <div style="flex:2;min-width:300px;background:white;border-radius:20px;padding:20px;box-shadow:0 2px 15px rgba(0,0,0,0.08);"><h3 style="color:#1a237e;">📈 Lost vs Found (Last 7 days)</h3><div style="width:100%;height:200px;background:#f9f9f9;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#aaa;">📊 Chart Area</div></div>
        <div style="flex:1;min-width:250px;background:white;border-radius:20px;padding:20px;box-shadow:0 2px 15px rgba(0,0,0,0.08);"><h3 style="color:#1a237e;">🥧 Category</h3><div style="width:100%;height:200px;background:#f9f9f9;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#aaa;">🥧 Chart Area</div></div>
    </div>
    <div style="background:white;border-radius:16px;padding:14px;margin-bottom:20px;text-align:center;border-left:5px solid #8e44ad;font-weight:bold;">🌍 Most Active Country: -- Select City -- (1 reports)</div>
    <div style="margin-bottom:24px;padding:16px;background:white;border-radius:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="color:#1a237e;">📅 Daily Reports</h3>
        <table style="width:100%;border-collapse:collapse;"><tr style="background:#1a237e;color:white;"><th style="padding:10px;">Date</th><th style="padding:10px;">❌ Lost</th><th style="padding:10px;">✅ Found</th></tr>${last7Dates.map((d, idx) => `<tr><td style="padding:8px;text-align:center;">${d}</td><td style="color:#e74c3c;text-align:center;">${lost7[idx]}</td><td style="color:#27ae60;text-align:center;">${found7[idx]}</td></tr>`).join('') || '<tr><td colspan="3" style="text-align:center;color:#999;">No data</td></tr>'}</table>
        <div style="text-align:right;margin-top:10px;"><button style="padding:8px 20px;background:#27ae60;color:white;border:none;border-radius:6px;cursor:pointer;">📊 Export Report</button></div>
    </div>
    <div style="margin-bottom:24px;background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="color:#1a237e;">⏳ User Registration Requests</h3>
        ${pendingUsers.length===0?'<p style="color:#999;">No pending requests</p>':pendingUsers.map(u => `<div style="display:flex;justify-content:space-between;margin:8px 0;padding:12px;background:#f5f5f5;border-radius:12px;"><div><strong>${u.name}</strong><br><small>${u.email||u.phone}</small></div><div style="display:flex;gap:6px;"><button style="padding:6px 12px;background:#27ae60;color:white;border:none;border-radius:5px;cursor:pointer;" onclick="approveUser('${u.id}')">✅ Approve</button><button style="padding:6px 12px;background:#e74c3c;color:white;border:none;border-radius:5px;cursor:pointer;" onclick="rejectUser('${u.id}')">❌ Reject</button></div></div>`).join('')}
    </div>
    <div style="margin-bottom:24px;background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="color:#1a237e;">👥 Approved Users</h3>
        ${approvedUsers.map(u => `<div style="display:flex;justify-content:space-between;align-items:center;margin:5px 0;padding:10px;background:#e8f5e9;border-radius:12px;flex-wrap:wrap;gap:6px;"><span><strong>${u.name||'User'}</strong> (${u.email||u.phone})</span><div style="display:flex;gap:6px;"><button style="padding:6px 12px;background:#009688;color:white;border:none;border-radius:5px;cursor:pointer;">👁️ Details</button><button style="padding:6px 12px;background:#f39c12;color:white;border:none;border-radius:5px;cursor:pointer;">📨 Send Message</button><button style="padding:6px 12px;background:${u.banned?'#27ae60':'#e74c3c'};color:white;border:none;border-radius:5px;cursor:pointer;" onclick="banUserFirestore('${u.email||u.phone}')">${u.banned?'✅ فك الحظر':'🚫 Ban'}</button><button style="padding:6px 12px;background:#e74c3c;color:white;border:none;border-radius:5px;cursor:pointer;" onclick="deleteUserFirestore('${u.email||u.phone}')">🗑️ Delete</button></div></div>`).join('')}
        ${approvedUsers.length===0?'<p style="color:#999;">No users</p>':''}
    </div>
    <div style="margin-bottom:24px;background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="color:#1a237e;">🏛️ طلبات المنظمات</h3>
                ${pendingOrganizations.length===0?'<p style="color:#999;">No organization requests / لا توجد طلبات منظمات</p>':pendingOrganizations.map(o => `
        <div style="display:flex;justify-content:space-between;align-items:center;margin:5px 0;padding:10px;background:#fff3e0;border-radius:12px;flex-wrap:wrap;gap:6px;">
            <span><strong>${o.name||'No name'}</strong><br><small>📧 ${o.email||''} | 📞 ${o.phone||''} | 🏢 ${o.type||''}</small></span>
            <div style="display:flex;gap:6px;">
                <button onclick="window._approveOrg('${o.id}')" style="padding:6px 12px;background:#27ae60;color:white;border:none;border-radius:5px;cursor:pointer;">✅ Approve</button>
                <button onclick="window._rejectOrg('${o.id}')" style="padding:6px 12px;background:#e74c3c;color:white;border:none;border-radius:5px;cursor:pointer;">🗑️ Delete</button>
            </div>
        </div>`).join('')}
    </div>
        <div style="margin-bottom:24px;background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="color:#1a237e;">⏳ Pending Reports</h3>
        ${pendingReports.length===0?'<p style="color:#999;">لا توجد بلاغات معلقة</p>':pendingReports.map(r => `
        <div style="display:flex;justify-content:space-between;align-items:center;margin:5px 0;padding:10px;background:#fff3e0;border-radius:12px;flex-wrap:wrap;gap:6px;">
            <span><strong>${r.desc||'No desc'}</strong><br><small>👤 ${r.userEmail||''} | 📍 ${r.city||''} | ${r.type||''}</small></span>
            <div style="display:flex;gap:6px;">
                <button onclick="window._approvePendingReport('${r.id}')" style="padding:6px 12px;background:#27ae60;color:white;border:none;border-radius:5px;cursor:pointer;">✅ Approve</button>
                <button onclick="window._deletePendingReport('${r.id}')" style="padding:6px 12px;background:#e74c3c;color:white;border:none;border-radius:5px;cursor:pointer;">🗑️ Delete</button>
            </div>
        </div>`).join('')}
    </div>
    <div style="margin-bottom:24px;background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="color:#1a237e;">👥 Sub Admins</h3>
        ${subAdmins.length===0?'<p style="color:#999;">No sub admins</p>':subAdmins.map(u => `<div style="display:flex;justify-content:space-between;margin:5px 0;padding:10px;background:#fff3e0;border-radius:12px;"><span>${u.name} (${u.email||u.phone})</span><button style="padding:6px 12px;background:#e74c3c;color:white;border:none;border-radius:5px;cursor:pointer;">Remove Sub Admin</button></div>`).join('')}
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">
            <input type="text" id="subAdminName" placeholder="Sub Admin Name" style="flex:1;min-width:120px;padding:10px;border:1px solid #ddd;border-radius:8px;">
            <input type="text" id="subAdminEmail" placeholder="Sub Admin Email" style="flex:1;min-width:120px;padding:10px;border:1px solid #ddd;border-radius:8px;">
            <input type="text" id="subAdminPhone" placeholder="Sub Admin Phone" style="flex:1;min-width:120px;padding:10px;border:1px solid #ddd;border-radius:8px;">
            <input type="password" id="subAdminPassword" placeholder="Sub Admin Password" style="flex:1;min-width:120px;padding:10px;border:1px solid #ddd;border-radius:8px;">
            <button style="padding:10px 20px;background:#27ae60;color:white;border:none;border-radius:8px;cursor:pointer;">Add Sub Admin</button>
        </div>
    </div>
    <div style="margin-bottom:24px;background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="color:#1a237e;">📢 Send to All</h3>
        <div style="display:flex;gap:8px;"><input type="text" id="broadcastMessage" placeholder="Write message..." style="flex:1;padding:10px;border:1px solid #ddd;border-radius:8px;"><button style="padding:10px 20px;background:#8e44ad;color:white;border:none;border-radius:8px;cursor:pointer;">Send</button></div>
    </div>
    <div style="margin-bottom:24px;background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="color:#1a237e;">📋 All Items</h3>
        ${allItems.map(item => `<div style="display:flex;justify-content:space-between;align-items:center;margin:5px 0;padding:10px;background:${item.itemType==='lost'?'#ffebee':'#e8f5e9'};border-radius:12px;flex-wrap:wrap;gap:8px;"><div><strong>${item.itemType==='lost'?'🔴':'🟢'} ${item.desc||'No desc'}</strong><br><small>📍 ${item.city||'-- Select City --'} | 📅 ${item.date||''} | ${item.userEmail||''}</small></div><button style="padding:6px 12px;background:#e74c3c;color:white;border:none;border-radius:5px;cursor:pointer;" onclick="deleteItemFirestore('${item.id}','${item.itemType}')">🗑️ Delete</button></div>`).join('')}
        ${allItems.length===0?'<p style="color:#999;">No items</p>':''}
    </div>
    <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);margin-bottom:24px;">
        <h3 style="color:#1a237e;">📝 Activity Logs</h3>
        <p style="color:#999;">No activity</p>
    </div>
    <div style="text-align:center;padding:20px;">
        <span style="color:#1a237e;">🔍 Lost & Found Pro - </span>
        <span style="color:#3498db;cursor:pointer;margin:0 8px;">helpUs</span>
        <span style="color:#f39c12;cursor:pointer;margin:0 8px;">premium</span>
        <span style="color:#e74c3c;cursor:pointer;margin:0 8px;">donate</span>
        <span style="color:#999;cursor:pointer;margin:0 8px;">closeAd</span>
    </div>`;

    window.approveUser = async (id) => { const db=firebase.firestore(); const docRef=db.collection('pendingUsers').doc(id); const doc=await docRef.get(); if(doc.exists){ const data=doc.data(); data.approved=true; await db.collection('users').add(data); await docRef.delete(); alert('✅ Approved'); location.reload(); } };
    window.rejectUser = async (id) => { const db=firebase.firestore(); await db.collection('pendingUsers').doc(id).delete(); alert('❌ Rejected'); location.reload(); };
    window.banUserFirestore = async (email) => { const db=firebase.firestore(); const snap=await db.collection('users').where('email','==',email).get(); if(!snap.empty){ const doc=snap.docs[0]; const data=doc.data(); await doc.ref.update({banned:!data.banned}); alert(data.banned?'✅ Unbanned':'🚫 Banned'); location.reload(); } };
    window.deleteUserFirestore = async (email) => { if(!confirm('Delete '+email+'?'))return; const db=firebase.firestore(); const snap=await db.collection('users').where('email','==',email).get(); for(const doc of snap.docs) await doc.ref.delete(); alert('✅ Deleted'); location.reload(); };
    window.deleteItemFirestore = async (id,type) => { if(!confirm('Delete?'))return; const db=firebase.firestore(); const coll=type==='lost'?'lostItems':'foundItems'; await db.collection(coll).doc(id).delete(); alert('✅ Deleted'); location.reload(); };

    console.log('✅ Full admin panel ready');
};

// ==========================================
// 3. تشغيل لوحة الإدارة و ربط الزر
// ==========================================
(async function initAdmin() {
    await refreshAdminPanel();
    setTimeout(() => {
        const adminLoginBtn = document.getElementById('adminLoginBtn');
        if (adminLoginBtn) {
            adminLoginBtn.onclick = async function() {
                const email = document.getElementById('loginEmail').value.trim();
                const password = document.getElementById('loginPassword').value;
                if (email && password) {
                    loginUser(email, password, true);
                } else {
                    alert('أدخل الإيميل وكلمة المرور');
                }
            };
            console.log('✅ Admin Login button linked');
        } else {
            console.warn('⚠️ Admin Login button not found');
        }
    }, 500);
})();
// ========== إعدادات المشرف ==========
function showAdminSettings() {
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('adminSettingsPage').classList.remove('hidden');
    renderAdminSettings();
}

function renderAdminSettings() {
    const db = firebase.firestore(); // تعريف db محلياً
    let container = document.getElementById('adminSettingsContent');
    if (!container) return;
    
    // الحصول على المستخدم الحالي من Firebase Auth
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    // جلب بيانات المستخدم من Firestore
    db.collection('users').doc(user.uid).get().then(function(doc) {
        let userData = doc.exists ? doc.data() : {};
        let userName = userData.name || user.displayName || user.email || '';
        
        container.innerHTML = `<div class="profile-card"><h2 style="color:var(--primary);margin-bottom:20px;">⚙️ ${t('adminSettings')}</h2>
            <div style="margin-bottom:20px;"><h3>${t('changeName')}</h3>
            <input type="text" id="adminNewName" class="modern-input" value="${userName}" placeholder="${t('newName')}" style="margin-bottom:8px;">
            <button id="changeNameBtn" class="btn-save">${t('changeName')}</button></div>
            <div style="margin-bottom:20px;"><h3>${t('changePassword')}</h3>
            <input type="password" id="adminCurrentPwd" class="modern-input" placeholder="${t('currentPassword')}" style="margin-bottom:8px;">
            <input type="password" id="adminNewPwd" class="modern-input" placeholder="${t('newPassword')}" style="margin-bottom:8px;">
            <button id="changePasswordBtn" class="btn-save">${t('changePassword')}</button></div></div>`;
        
        document.getElementById('changeNameBtn')?.addEventListener('click', function() {
            let nn = document.getElementById('adminNewName').value.trim();
            if (nn) {
                db.collection('users').doc(user.uid).update({ name: nn })
                    .then(() => {
                        showToast(t('nameChanged'));
                        renderAdminSettings();
                    })
                    .catch(() => showToast(t('error'), 'error'));
            }
        });
        
        document.getElementById('changePasswordBtn')?.addEventListener('click', function() {
            let cp = document.getElementById('adminCurrentPwd').value;
            let np = document.getElementById('adminNewPwd').value;
            if (np.length < 4) return showToast('Password too short', 'error');
            
            // تغيير كلمة المرور في Firebase Auth
            const credential = firebase.auth.EmailAuthProvider.credential(user.email, cp);
            user.reauthenticateWithCredential(credential)
                .then(function() {
                    return user.updatePassword(np);
                })
                .then(function() {
                    showToast(t('passwordChanged'));
                    document.getElementById('adminCurrentPwd').value = '';
                    document.getElementById('adminNewPwd').value = '';
                })
                .catch(function(error) {
                    showToast(t('wrongPassword'), 'error');
                });
        });
    }).catch(function() {});
}

// ========== تفاصيل المستخدم ==========
function showUserDetails(email) {
    const db = firebase.firestore(); // تعريف db محلياً
    // جلب المستخدم من Firestore
    db.collection('users').where('email', '==', email).get().then(function(snap) {
        if (snap.empty) {
            db.collection('users').where('phone', '==', email).get().then(function(snap2) {
                if (!snap2.empty) {
                    snap2.forEach(function(doc) { renderUserDetails(doc.id, doc.data(), email); });
                }
            });
            return;
        }
        snap.forEach(function(doc) {
            renderUserDetails(doc.id, doc.data(), email);
        });
    }).catch(function() {});
}

function renderUserDetails(userId, user, email) {
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('userDetailsPage').classList.remove('hidden');
    
    let points = userPoints[userId] || 0;
    let balance = userBalances[userId] || 0;
    let myLost = lostArray.filter(i => i.userEmail === email || i.userEmail === userId).length;
    let myFound = foundArray.filter(i => i.userEmail === email || i.userEmail === userId).length;
    
    let container = document.getElementById('userDetailsContent');
    container.innerHTML = `<div class="profile-card">
        <div class="profile-avatar">👤</div>
        <div class="profile-name">${user.name || user.email || user.phone}</div>
        <div class="profile-level">${getUserLevel(points)} • ${points} ${t('points')}</div>
        <div class="profile-stats">
            <div class="profile-stat"><div class="profile-stat-num">${myLost}</div><div class="profile-stat-label">📦 ${t('lost')}</div></div>
            <div class="profile-stat"><div class="profile-stat-num">${myFound}</div><div class="profile-stat-label">✅ ${t('found')}</div></div>
            <div class="profile-stat"><div class="profile-stat-num">${points}</div><div class="profile-stat-label">⭐ ${t('points')}</div></div>
        </div>
        ${balance > 0 ? `<div class="balance-card"><div class="balance-amount">$${balance.toFixed(2)}</div><div>${t('earned')}</div></div>` : ''}
        <div style="margin-top:16px;display:flex;gap:8px;">
            <input type="text" id="userMessageInput" class="modern-input" placeholder="${t('writeMessage')}" style="flex:1;">
            <button id="sendUserMessageBtn" class="btn-sm btn-purple" data-email="${user.email || user.phone}">${t('send')}</button>
        </div>
    </div>`;
    
    document.getElementById('sendUserMessageBtn')?.addEventListener('click', function() {
        let msg = document.getElementById('userMessageInput').value.trim();
        if (msg) {
            sendMessageToUser(this.dataset.email, msg);
            showToast(t('messageSent'));
            document.getElementById('userMessageInput').value = '';
        }
    });
}

// ========== دوال مساعدة للإدارة ==========
function sendMessageToUser(email, msg) {
    if (!email || !msg) return;
    const db = firebase.firestore(); // تعريف db محلياً
    db.collection('notifications').add({
        recipientId: email,
        msg: msg,
        timestamp: new Date().toISOString(),
        from: 'Admin',
        read: false
    }).catch(function(error) {
        console.error('Error sending message:', error);
    });
}

// ========== الإشعارات ==========
async function sendMessageToUser(credential, msg) {
    if (!msg) return;
    
    // جلب المستخدم من Firestore
    const db = firebase.firestore(); // تعريف db محلياً
    let userDoc = null;
    
    const snap = await db.collection('users').where('email', '==', credential).get();
    if (!snap.empty) {
        snap.forEach(doc => userDoc = { id: doc.id, ...doc.data() });
    }
    
    if (!userDoc) {
        const snap2 = await db.collection('users').where('phone', '==', credential).get();
        if (!snap2.empty) {
            snap2.forEach(doc => userDoc = { id: doc.id, ...doc.data() });
        }
    }
    
    if (userDoc) {
        let userId = userDoc.id || userDoc.email || userDoc.phone;
        let senderName = 'Admin';
        
        // جلب اسم المرسل من Firebase Auth
        const user = firebase.auth().currentUser;
        if (user) {
            const doc = await db.collection('users').doc(user.uid).get();
            if (doc.exists) {
                senderName = doc.data().name || user.displayName || user.email || 'Admin';
            } else {
                senderName = user.displayName || user.email || 'Admin';
            }
        }
        
        await db.collection('notifications').add({
            recipientId: userId,
            msg: msg,
            timestamp: new Date().toISOString(),
            from: senderName,
            read: false
        });
        addLog('Message Sent', credential, `To: ${credential}`);
    }
}

async function showNotificationsBadge() {
    const db = firebase.firestore(); // تعريف db محلياً
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    // جلب بيانات المستخدم من Firestore
    const doc = await db.collection('users').doc(user.uid).get();
    if (doc.exists && doc.data().isAdmin) return;
    
    let userId = user.uid;
    
    const snap = await db.collection('notifications')
        .where('recipientId', '==', userId)
        .where('read', '==', false)
        .get();
    let count = snap.docs.length;
    let btn = document.getElementById('dashboardNotificationsBtn');
    if (btn) {
        if (count > 0) {
            btn.style.background = '#ff4444';
            btn.title = `${count} new notifications`;
        } else {
            btn.style.background = 'rgba(255,255,255,0.15)';
            btn.title = t('notifications');
        }
    }
}

async function showNotifications() {
    const db = firebase.firestore(); // تعريف db محلياً
    document.getElementById('dashboardPage').classList.add('hidden');
    document.getElementById('notificationsPage').classList.remove('hidden');
    
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    let userId = user.uid;
    let snap = await db.collection('notifications')
        .where('recipientId', '==', userId)
        .orderBy('timestamp', 'desc')
        .get();
    let notifs = snap.docs.map(d => d.data());
    let container = document.getElementById('notificationsList');
    if (notifs.length === 0) {
        container.innerHTML = `<p style="text-align:center;padding:40px;color:var(--text-light);">${t('noNotifications')}</p>`;
        return;
    }
    container.innerHTML = notifs.map(n => {
        let extendHTML = '';
        if (n.type === 'mapExpiry' && n.reportId) {
            extendHTML = `<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;"><button class="btn-sm btn-save" onclick="extendMapExpiry(${n.reportId},30)">📅 1M</button><button class="btn-sm btn-save" onclick="extendMapExpiry(${n.reportId},90)">📅 3M</button><button class="btn-sm btn-save" onclick="extendMapExpiry(${n.reportId},180)">📅 6M</button><button class="btn-sm btn-save" onclick="extendMapExpiry(${n.reportId},270)">📅 9M</button><button class="btn-sm btn-save" onclick="extendMapExpiry(${n.reportId},365)">📅 1Y</button></div>`;
        }
        return `<div style="background:var(--card);border-radius:12px;padding:14px;margin:8px 0;border-left:4px solid var(--primary);"><strong>📢 ${t('fromAdmin')}</strong><br><p>${n.msg}</p><small>${new Date(n.timestamp).toLocaleString()}</small>${extendHTML}</div>`;
    }).join('');
}

function extendMapExpiry(reportId, days) {
    let item = lostArray.find(i => i.id === reportId) || foundArray.find(i => i.id === reportId);
    if (!item) return;
    item.mapExpiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    item.expiryNotified = false;
    showAlert(t('success'), '✅ Map visibility extended for ' + days + ' days!');
    updateDashboardMap();
    initPublicMap();
}

// ========== الخريطة العامة ==========
function initPublicMap() {
    setTimeout(() => {
        if (publicMap) { publicMap.off(); publicMap.remove(); publicMap = null; }
        let mapEl = document.getElementById('publicMap');
        if (!mapEl) return;
        
        publicMap = L.map('publicMap', { zoomControl: false, attributionControl: false }).setView([31.95, 35.9], 7);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OSM' }).addTo(publicMap);

        // ✨ ضبط ارتفاع الخريطة حسب الفورم
        publicMap.whenReady(function() {
            var hero = document.querySelector('.login-hero');
            var loginContainer = document.querySelector('.login-container');
            if (hero && loginContainer) {
                hero.style.height = loginContainer.scrollHeight + 'px';
                publicMap.invalidateSize();
            }
        });

        // جلب المستخدمين المحظورين من Firestore
        let bannedUsers = [];
        db.collection('users').where('banned', '==', true).get().then(function(snap) {
            snap.forEach(function(doc) {
                const data = doc.data();
                bannedUsers.push(data.email || data.phone);
            });
            renderPublicMapItems(bannedUsers);
        }).catch(function() {
            renderPublicMapItems([]);
        });
    }, 1000);
}

function renderPublicMapItems(bannedUsers) {
    var lostIcon = L.divIcon({
        className: '',
        html: '<div style="background:#e74c3c;color:white;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-weight:bold;font-size:16px;animation: pulse 2s infinite;box-shadow: 0 0 8px #e74c3c;">L</div>',
        iconSize: [28, 28], popupAnchor: [0, -14]
    });
    var foundIcon = L.divIcon({
        className: '',
        html: '<div style="background:#27ae60;color:white;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-weight:bold;font-size:16px;animation: pulse 2s infinite;box-shadow: 0 0 8px #27ae60;">F</div>',
        iconSize: [28, 28], popupAnchor: [0, -14]
    });
    var rewardIcon = L.divIcon({
        className: '',
        html: '<div style="background:#f0a500;color:white;border-radius:50%;width:34px;height:34px;text-align:center;line-height:34px;font-weight:bold;font-size:20px;animation: pulse 1s infinite;box-shadow: 0 0 14px #f0a500;">$</div>',
        iconSize: [34, 34], popupAnchor: [0, -17]
    });

    let allItems = [...lostArray.map(i => ({...i, itemType: 'lost'})), ...foundArray.map(i => ({...i, itemType: 'found'}))];
    allItems = allItems.filter(item => {
        if (!item.lat || !item.lng) return false;
        if (item.mapExpiry && new Date(item.mapExpiry).getTime() > Date.now()) return true;
        if (bannedUsers.includes(item.userEmail)) return false;
        return true;
    });

    let cityGroups = {};
    allItems.forEach(item => {
        let city = item.city || 'Unknown';
        if (!cityGroups[city]) cityGroups[city] = [];
        cityGroups[city].push(item);
    });

    let finalItems = [];
    Object.keys(cityGroups).forEach(city => {
        let items = cityGroups[city];
        items.sort((a, b) => {
            if (a.reward?.money && !b.reward?.money) return -1;
            if (!a.reward?.money && b.reward?.money) return 1;
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
        finalItems = finalItems.concat(items.slice(0, 5));
    });

    let usedCoords = {};
    finalItems.forEach((item) => {
        let key = item.lat.toFixed(5) + ',' + item.lng.toFixed(5);
        if (!usedCoords[key]) usedCoords[key] = [];
        usedCoords[key].push(item);
    });

    Object.keys(usedCoords).forEach(key => {
        let items = usedCoords[key];
        let [baseLat, baseLng] = key.split(',').map(Number);
        
        items.forEach((item, i) => {
            let offsetLat = 0, offsetLng = 0;
            if (items.length > 1) {
                let angle = (i / items.length) * 360 * Math.PI / 180;
                let radius = 0.0004;
                offsetLat = Math.cos(angle) * radius;
                offsetLng = Math.sin(angle) * radius;
            }
            
            let icon = item.reward?.money ? rewardIcon : (item.itemType === 'lost' ? lostIcon : foundIcon);
            L.marker([baseLat + offsetLat, baseLng + offsetLng], {icon: icon})
                .addTo(publicMap)
                .bindPopup('<b>' + escapeHtml(item.desc).substring(0, 30) + '...</b><br><small>' + item.city + '</small>' + (item.reward?.money ? '<br>💰 $' + item.reward.moneyAmount : ''));
        });
    });
    
    publicMap.invalidateSize();
}

// ========== الملف الشخصي ==========
function showProfile() {
    var u = currentUser;
    if (!u) return;
    document.getElementById('dashboardPage').classList.add('hidden');
    document.getElementById('profilePage').classList.remove('hidden');
    var c = document.getElementById('profileContent');
    c.innerHTML = '<div class="profile-card"><div class="profile-avatar">👤</div><div class="profile-name">' + (u.name || u.email) + '</div><div class="profile-level">🟢 Beginner</div><div class="profile-stats"><div class="profile-stat"><div class="profile-stat-num">0</div><div class="profile-stat-label">📦 Lost</div></div><div class="profile-stat"><div class="profile-stat-num">0</div><div class="profile-stat-label">✅ Found</div></div><div class="profile-stat"><div class="profile-stat-num">0</div><div class="profile-stat-label">⭐ Points</div></div></div></div>';
}
function renderProfile(user) {
    var u = user || currentUser;
    var container = document.getElementById('profileContent');
    if (!container || !u) return;
    
    container.innerHTML = '<div class="profile-card">' +
        '<div class="profile-avatar">👤</div>' +
        '<div class="profile-name">' + (u.name || u.email || '') + '</div>' +
        '<div class="profile-level">🟢 Beginner • 0 Points</div>' +
        '<div class="profile-stats">' +
        '<div class="profile-stat"><div class="profile-stat-num">0</div><div class="profile-stat-label">📦 Lost</div></div>' +
        '<div class="profile-stat"><div class="profile-stat-num">0</div><div class="profile-stat-label">✅ Found</div></div>' +
        '<div class="profile-stat"><div class="profile-stat-num">0</div><div class="profile-stat-label">⭐ Points</div></div>' +
        '</div></div>';
}
// ========== ربط الأحداث ==========
function attachAppEvents() {
    document.querySelectorAll('.chip').forEach(chip=>{chip.addEventListener('click',function(){let section=this.closest('.report-section');section.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));this.classList.add('active');selectedCategory=this.dataset.cat;});});
    document.getElementById('saveLostBtn')?.addEventListener('click',saveLost); document.getElementById('saveFoundBtn')?.addEventListener('click',saveFound);
    document.getElementById('resetLostBtn')?.addEventListener('click',()=>{clearLostForm();showToast(t('formCleared'));}); document.getElementById('resetFoundBtn')?.addEventListener('click',()=>{clearFoundForm();showToast(t('formCleared'));});
    document.getElementById('matchBtn')?.addEventListener('click',matchItems);
    document.getElementById('shareLostBtn')?.addEventListener('click',()=>{let desc=document.getElementById('lostDesc').value.trim();if(!desc)return showToast(t('enterDescription'),'error');let text=`🔴 Lost: ${desc} - ${document.getElementById('lostDate').value} - ${document.getElementById('lostCity').value}`;let waLink=`https://wa.me/?text=${encodeURIComponent(text+' - via Lost & Found Pro')}`;window.open(waLink,'_blank');});
    document.getElementById('shareFoundBtn')?.addEventListener('click',()=>{let desc=document.getElementById('foundDesc').value.trim();if(!desc)return showToast(t('enterDescription'),'error');let text=`🟢 Found: ${desc} - ${document.getElementById('foundDate').value} - ${document.getElementById('foundCity').value}`;let waLink=`https://wa.me/?text=${encodeURIComponent(text+' - via Lost & Found Pro')}`;window.open(waLink,'_blank');});
    document.getElementById('backToDashboardBtn')?.addEventListener('click',()=>{document.getElementById('mainApp').classList.add('hidden');document.getElementById('dashboardPage').classList.remove('hidden');updateDashboardStats();updateDashboardMap();populateDashboardFilters();renderDashboardData();});
    setupImagePreview('lostImages','lostImagePreview'); setupImagePreview('foundImages','foundImagePreview');
    document.getElementById('lostCurrentLocationBtn')?.addEventListener('click',()=>{if(navigator.geolocation)navigator.geolocation.getCurrentPosition(pos=>{lostSelectMap.setView([pos.coords.latitude,pos.coords.longitude],13);if(lostMarker)lostSelectMap.removeLayer(lostMarker);lostMarker=L.marker([pos.coords.latitude,pos.coords.longitude]).addTo(lostSelectMap);document.getElementById('lostLat').value=pos.coords.latitude;document.getElementById('lostLng').value=pos.coords.longitude;});else showToast(t('locationNotSupported'),'error');});
    document.getElementById('foundCurrentLocationBtn')?.addEventListener('click',()=>{if(navigator.geolocation)navigator.geolocation.getCurrentPosition(pos=>{foundSelectMap.setView([pos.coords.latitude,pos.coords.longitude],13);if(foundMarker)foundSelectMap.removeLayer(foundMarker);foundMarker=L.marker([pos.coords.latitude,pos.coords.longitude]).addTo(foundSelectMap);document.getElementById('foundLat').value=pos.coords.latitude;document.getElementById('foundLng').value=pos.coords.longitude;});else showToast(t('locationNotSupported'),'error');});
    document.getElementById('closeAdBar')?.addEventListener('click',()=>{document.getElementById('adBar').style.display='none';});
}

function checkMapExpiryNotifications() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    let now = new Date(), allItems = [...lostArray, ...foundArray];
    let userId = user.uid;
    allItems.forEach(item => {
        if (!item.mapExpiry || item.userEmail !== user.email || item.expiryNotified) return;
        let expiryTime = new Date(item.mapExpiry), timeLeft = expiryTime - now, fourHours = 4 * 60 * 60 * 1000;
        if (timeLeft > 0 && timeLeft <= fourHours) {
            adminNotifications[userId] = adminNotifications[userId] || [];
            adminNotifications[userId].push({ msg: `⚠️ Your report "${item.desc.substring(0,30)}..." will disappear from map in 4 hours. Pay to extend.`, timestamp: new Date().toISOString(), reportId: item.id, type: 'mapExpiry' });
        }
    });
}

// ========== تفعيل ورفض المنظمات ==========
async function approveOrganization(orgId) {
    const db = firebase.firestore();
    const docRef = db.collection('pendingOrganizations').doc(orgId);
    const doc = await docRef.get();
    if (doc.exists) {
        const data = doc.data();
        data.approved = true;
        data.isAdmin = true;
        data.isOrganization = true;
        data.subscriptionActive = false;
        data.trialStart = new Date().toISOString();
        await db.collection('users').add(data);
        await docRef.delete();
        refreshAdminPanel();
        showToast("✅ أسبوع تجربة مجاني", 'success');
    }
}

function rejectOrganization(orgId) {
    const db = firebase.firestore();
    db.collection('pendingOrganizations').doc(orgId).delete()
        .then(() => {
            refreshAdminPanel();
            showToast("تم رفض المنظمة", 'error');
        })
        .catch(() => {});
}

// ========== فلتر القريب ==========
let userCurrentCity = null;
let nearMeActive = false;

function updateNearMeButton() {
    var btn = document.getElementById('nearMeNewBtn');
    if (btn) {
        if (nearMeActive) {
            btn.innerHTML = '✅ 📍 NEAR ME';
            btn.style.background = '#27ae60';
        } else {
            btn.innerHTML = '📍 NEAR ME';
            btn.style.background = '#e74c3c';
        }
    }
}

function enableNearMeFilter() {
    if (!navigator.geolocation) { showToast("📍 موقعك غير مدعوم", 'error'); return; }
    showToast("📍 جاري تحديد موقعك...", 'info');
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude, lng = position.coords.longitude;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`);
            const data = await response.json();
            userCurrentCity = data.address?.city || data.address?.town || data.address?.village || data.address?.county || data.address?.state;
            if (userCurrentCity) {
                nearMeActive = true;
                showToast(`📍 البلاغات القريبة من: ${userCurrentCity}`, 'success');
                const citySelect = document.getElementById('filterCityNew2');
                if (citySelect) {
                    let exists = false;
                    for (let i = 0; i < citySelect.options.length; i++) {
                        if (citySelect.options[i].value === userCurrentCity) { citySelect.value = userCurrentCity; exists = true; break; }
                    }
                    if (!exists) { const opt = document.createElement('option'); opt.value = userCurrentCity; opt.text = userCurrentCity; citySelect.appendChild(opt); citySelect.value = userCurrentCity; }
                }
                renderDashboardData();
                updateNearMeButton();
            } else { showToast("لم نتمكن من تحديد مدينتك", 'error'); }
        } catch(e) { showToast("فشل تحديد الموقع", 'error'); }
    }, () => showToast("الرجاء السماح بتحديد الموقع", 'error'));
}

function disableNearMeFilter() {
    nearMeActive = false; userCurrentCity = null;
    const citySelect = document.getElementById('filterCityNew2');
    if (citySelect) citySelect.value = '';
    renderDashboardData();
    updateNearMeButton();
    showToast("تم إلغاء فلتر القريب", 'info');
}

function toggleNearMeFilter() { if (nearMeActive) disableNearMeFilter(); else enableNearMeFilter(); }

// ========== الإشعارات الفورية عند التطابق ==========
function checkRealtimeMatch(newItem, type) {
    const targetArray = type === 'lost' ? foundArray : lostArray;
    for (let item of targetArray) {
        if (item.city === newItem.city && isSimilar(item.desc, newItem.desc)) {
            showToast(`🎯 تطابق! ${type === 'lost' ? 'وجدنا شيئاً مشابهاً مفقوداً' : 'وجدنا شيئاً مشابهاً موجوداً'}`, 'success');
            if ('Notification' in navigator && Notification.permission === 'granted') {
                new Notification('تطابق جديد في Lost & Found Pro', { body: `تم العثور على تطابق: ${newItem.desc.substring(0, 50)}... في مدينة ${newItem.city}`, icon: 'https://cdn-icons-png.flaticon.com/512/709/709722.png' });
            }
            playMatchSound();
            break;
        }
    }
}

// ========== Quick Improvements ==========
function setupCopyLinks() {
    document.querySelectorAll('.copyLinkBtn').forEach(btn => {
        btn.onclick = (e) => { e.stopPropagation(); let id = btn.dataset.id, type = btn.dataset.type; let link = window.location.origin + window.location.pathname + `?report=${type}-${id}`; navigator.clipboard.writeText(link); showToast('✅ Link copied'); };
    });
}

function deleteMyAccount() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    Swal.fire({ title: '⚠️ Are you sure?', text: 'Your account and all your reports will be deleted permanently', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes, delete my account', cancelButtonText: 'Cancel' }).then((result) => {
        if (result.isConfirmed) {
            const userId = user.uid;
            lostArray = lostArray.filter(i => i.userEmail !== user.email && i.userEmail !== userId);
            foundArray = foundArray.filter(i => i.userEmail !== user.email && i.userEmail !== userId);
            
            // حذف المستخدم من Firestore
            db.collection('users').doc(user.uid).delete().catch(function() {});
            
            // حذف حساب Firebase Auth
            user.delete().catch(function() {});
            
            firebase.auth().signOut();
            document.getElementById('dashboardPage').classList.add('hidden');
            document.getElementById('loginPage').classList.remove('hidden');
            document.getElementById('loginPage').style.display = 'block';
            showToast('✅ Account deleted', 'info');
        }
    });
}

function addMapExpiryCounter() {
    document.querySelectorAll('.saved-item').forEach(item => {
        const id = parseInt(item.dataset.id), type = item.dataset.type;
        const report = type === 'lost' ? lostArray.find(i => i.id === id) : foundArray.find(i => i.id === id);
        if (report && report.mapExpiry) {
            const expiry = new Date(report.mapExpiry), now = new Date();
            const hoursLeft = Math.max(0, Math.floor((expiry - now) / (1000 * 60 * 60)));
            if (hoursLeft > 0 && hoursLeft <= 24) {
                let counterSpan = item.querySelector('.map-counter');
                if (!counterSpan) { counterSpan = document.createElement('div'); counterSpan.className = 'map-counter'; counterSpan.style.cssText = 'font-size: 10px; color: #f0a500; margin-top: 4px;'; item.querySelector('div:first-child')?.appendChild(counterSpan); }
                counterSpan.innerHTML = `⏳ Disappears from map in ${hoursLeft} hours`;
            }
        }
    });
}

function applyQuickImprovements() {
    setupCopyLinks(); addMapExpiryCounter();
    const profileContent = document.getElementById('profileContent');
    if (profileContent && !document.getElementById('deleteAccountBtn')) {
        const deleteBtn = document.createElement('button');
        deleteBtn.id = 'deleteAccountBtn'; deleteBtn.className = 'btn-red';
        deleteBtn.style.cssText = 'margin-top: 20px; width: 100%; padding: 12px;';
        deleteBtn.innerHTML = '🗑️ Delete My Account Permanently';
        deleteBtn.onclick = deleteMyAccount;
        profileContent.appendChild(deleteBtn);
    }
}

setInterval(addMapExpiryCounter, 60000);
setTimeout(applyQuickImprovements, 1000);

// ========== دوال الحفظ والتحميل من Firestore ==========
function saveToLocalStorage() {
    // Firestore هو المصدر الآن
}

function loadFromLocalStorage() {
    // Firestore هو المصدر الآن
}

// ========== ربط أزرار الداش بورد ==========
function attachDashboardEvents() {
    // Logout
    const logoutBtns = document.querySelectorAll('#dashboardLogoutBtn, #logoutUserBtn, #profileLogoutBtn');
    logoutBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            firebase.auth().signOut();
            location.reload();
        });
    });
    
    // Add Report
    const addBtn = document.getElementById('dashboardAddReportBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            document.getElementById('dashboardPage').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            if (typeof attachAppEvents === 'function') attachAppEvents();
        });
    }
    
    // Notifications
    const notifBtn = document.getElementById('dashboardNotificationsBtn');
    if (notifBtn) {
        notifBtn.addEventListener('click', function() {
            document.getElementById('dashboardPage').classList.add('hidden');
            document.getElementById('notificationsPage').classList.remove('hidden');
        });
    }
    
    // Profile
    const profileBtn = document.getElementById('dashboardProfileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            document.getElementById('dashboardPage').classList.add('hidden');
            document.getElementById('profilePage').classList.remove('hidden');
        });
    }
    
    // Dark Mode
    const darkBtn = document.getElementById('dashboardDarkModeBtn');
    if (darkBtn) {
        if (localStorage.getItem('darkMode') === '1') {
            document.body.classList.add('dark-mode');
        }
        darkBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark ? '1' : '0');
        });
    }
    
    // Back buttons
    const backBtns = ['notificationsBackToDashboardBtn', 'profileBackToDashboardBtn', 'backToDashboardBtn'];
    backBtns.forEach(function(id) {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function() {
                document.getElementById('mainApp').classList.add('hidden');
                document.getElementById('notificationsPage').classList.add('hidden');
                document.getElementById('profilePage').classList.add('hidden');
                document.getElementById('dashboardPage').classList.remove('hidden');
            });
        }
    });
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(attachDashboardEvents, 500);
});
// دالة إظهار لوحة الإدارة
function showAdminPanelPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('notificationsPage').style.display = 'none';
    document.getElementById('profilePage').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('adminPanel').classList.remove('hidden');
    refreshAdminPanel();
}

// ربط زر Admin Login
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var adminLoginBtn = document.getElementById('adminLoginBtn');
        if (adminLoginBtn) {
            adminLoginBtn.addEventListener('click', async function() {
                var email = document.getElementById('loginEmail').value.trim();
                var password = document.getElementById('loginPassword').value;
                if (email && password) {
                    loginUser(email, password, true);
                }
            });
        }
        
        var dashboardAdminBtn = document.getElementById('dashboardAdminBtn');
        if (dashboardAdminBtn) {
            dashboardAdminBtn.addEventListener('click', showAdminPanelPage);
        }
    }, 1000);
});
// ربط زر Logout
document.getElementById('logoutAdminBtn').onclick = function() {
    firebase.auth().signOut().then(function() {
        location.reload();
    });
};
// ========== صفحة إعدادات الأدمن الجديدة ==========
window.showAdminSettingsPage = function() {
    var container = document.getElementById('adminDynamicContent');
    if (!container) return;
    
    container.innerHTML = `
        <div style="max-width:600px;margin:0 auto;background:white;border-radius:20px;padding:30px;box-shadow:0 2px 20px rgba(0,0,0,0.1);">
            <h2 style="color:#1a237e;text-align:center;margin-bottom:20px;">⚙️ Admin Settings</h2>
            <div style="margin-bottom:20px;padding:15px;background:#f5f5f5;border-radius:12px;">
                <h4 style="margin-bottom:10px;">Change Name</h4>
                <input type="text" id="adminNewName" placeholder="Super Admin" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:8px;">
                <button id="changeNameBtn" style="padding:10px 20px;background:#27ae60;color:white;border:none;border-radius:8px;cursor:pointer;">Change Name</button>
            </div>
            <div style="margin-bottom:20px;padding:15px;background:#f5f5f5;border-radius:12px;">
                <h4 style="margin-bottom:10px;">Change Password</h4>
                <input type="password" id="adminCurrentPwd" placeholder="Current Password" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:8px;">
                <input type="password" id="adminNewPwd" placeholder="New Password" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:8px;">
                <button id="changePasswordBtn" style="padding:10px 20px;background:#3498db;color:white;border:none;border-radius:8px;cursor:pointer;">Change Password</button>
            </div>
            <button id="backToDashboardBtn" style="width:100%;padding:12px;background:#e74c3c;color:white;border:none;border-radius:8px;cursor:pointer;">← Back to Dashboard</button>
        </div>
    `;
    
    document.getElementById('changeNameBtn').onclick = function() {
        var nn = document.getElementById('adminNewName').value.trim();
        if (!nn) return alert('Enter name');
        var user = firebase.auth().currentUser;
        if (user) {
            firebase.firestore().collection('users').where('email','==',user.email).get().then(function(snap) {
                snap.forEach(function(doc) { doc.ref.update({name: nn}); });
                alert('✅ Name updated');
            });
        }
    };
    
    document.getElementById('changePasswordBtn').onclick = function() {
        var cp = document.getElementById('adminCurrentPwd').value;
        var np = document.getElementById('adminNewPwd').value;
        if (!cp || !np) return alert('Fill all fields');
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, cp);
        user.reauthenticateWithCredential(cred).then(function() {
            return user.updatePassword(np);
        }).then(function() {
            alert('✅ Password updated');
        }).catch(function(e) {
            alert('❌ ' + e.message);
        });
    };
    
    document.getElementById('backToDashboardBtn').onclick = function() {
        refreshAdminPanel();
    };
};

// ربط زر Settings
document.getElementById('adminSettingsBtn').onclick = function() {
    showAdminSettingsPage();
};
// ربط زر Back to Dashboard في صفحة الإعدادات
document.getElementById('adminDynamicContent').addEventListener('click', function(e) {
    if (e.target.id === 'backToDashboardBtn') {
        refreshAdminPanel();
    }
});
// ربط زر Export All Data
document.getElementById('adminExportAllBtn').onclick = async function() {
    var db = firebase.firestore();
    var data = {};
    
    var lostSnap = await db.collection('lostItems').get();
    data.lostItems = [];
    lostSnap.forEach(d => data.lostItems.push(d.data()));
    
    var foundSnap = await db.collection('foundItems').get();
    data.foundItems = [];
    foundSnap.forEach(d => data.foundItems.push(d.data()));
    
    var usersSnap = await db.collection('users').get();
    data.users = [];
    usersSnap.forEach(d => data.users.push(d.data()));
    
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'lost_found_backup_' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ Data exported');
};
// ربط زر Import Data
document.getElementById('adminImportDataBtn').onclick = function() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var text = await file.text();
        try {
            var data = JSON.parse(text);
            if (!confirm('⚠️ This will overwrite all data. Continue?')) return;
            var db = firebase.firestore();
            var batch = db.batch();
            
            if (data.lostItems) {
                data.lostItems.forEach(function(item) {
                    var ref = db.collection('lostItems').doc();
                    batch.set(ref, item);
                });
            }
            if (data.foundItems) {
                data.foundItems.forEach(function(item) {
                    var ref = db.collection('foundItems').doc();
                    batch.set(ref, item);
                });
            }
            if (data.users) {
                data.users.forEach(function(item) {
                    var ref = db.collection('users').doc();
                    batch.set(ref, item);
                });
            }
            
            await batch.commit();
            alert('✅ Data imported successfully');
            location.reload();
        } catch (err) {
            alert('❌ Invalid JSON file');
        }
    };
    input.click();
};
// ربط زر Back to Dashboard
document.getElementById('adminBackToDashboardBtn').onclick = function() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('dashboardPage').style.display = 'block';
    document.getElementById('dashboardPage').classList.remove('hidden');
};
// ربط زر Dark Mode
var darkBtn = document.getElementById('dashboardDarkModeBtn');
if (darkBtn) {
    darkBtn.onclick = function() {
        document.body.classList.toggle('dark-mode');
    };
}
// تحميل الخريطة العامة تلقائياً
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var el = document.getElementById('publicMap');
        if (el && typeof initPublicMap === 'function') {
            el.style.display = 'block';
            el.style.height = '300px';
            el.style.width = '100%';
            initPublicMap();
            console.log('✅ Public map loaded');
        }
    }, 1500);
});
// إخفاء زر Admin Panel عن غير الأدمن
(function() {
    var adminBtn = document.getElementById('dashboardAdminBtn');
    if (adminBtn) {
        adminBtn.style.display = 'none';
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.firestore().collection('users').where('email', '==', user.email).get().then(function(snap) {
                    var isAdmin = false;
                    snap.forEach(function(doc) {
                        if (doc.data().isAdmin) isAdmin = true;
                    });
                    if (isAdmin) {
                        adminBtn.style.display = 'block';
                    }
                });
            }
        });
    }
})();
// تحميل خريطة الداشبورد
(function() {
    setTimeout(function() {
        var mapEl = document.getElementById('dashboardMap');
        if (mapEl && typeof updateDashboardMap === 'function') {
            mapEl.style.display = 'block';
            mapEl.style.height = '300px';
            mapEl.style.width = '100%';
            updateDashboardMap();
            console.log('✅ Dashboard map loaded');
        }
    }, 1500);
})();
// ========== إصلاح القوائم والموقع ==========

// 1. تعبئة الدول
(function fillAllCountries() {
    var lostC = document.getElementById('lostCountry');
    var foundC = document.getElementById('foundCountry');
    
    if (lostC && lostC.options.length === 0) {
        geoData.forEach(function(country) {
            lostC.appendChild(new Option(country.name, country.name));
            foundC.appendChild(new Option(country.name, country.name));
        });
    }
})();

// 2. تحديث المدن فقط
function updateCitiesAndCode(type) {
    var countrySelect = document.getElementById(type + 'Country');
    var citySelect = document.getElementById(type + 'City');
    var selected = countrySelect.value;
    
    citySelect.innerHTML = '<option value="">-- Select City --</option>';
    
    var country = geoData.find(function(c) { return c.name === selected; });
    
    if (country) {
        country.cities.forEach(function(city) {
            citySelect.appendChild(new Option(city, city));
        });
    }
}

// 2.5 تعبئة الرموز الدولية مرة واحدة
(function fillPhoneCodes() {
    ['lost', 'found'].forEach(function(type) {
        ['PhoneCode', 'PhoneCode2'].forEach(function(id) {
            var el = document.getElementById(type + id);
            if (el) {
                el.innerHTML = '<option value="">-- Select Code --</option>';
                geoData.forEach(function(c) {
                    el.appendChild(new Option(c.name + ' (' + c.code + ')', c.code));
                });
            }
        });
    });
})();

// 3. ربط الأحداث
document.getElementById('lostCountry').onchange = function() { updateCitiesAndCode('lost'); };
document.getElementById('foundCountry').onchange = function() { updateCitiesAndCode('found'); };
// 4. عرض اسم المستخدم في الناف بار
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        firebase.firestore().collection('users').where('email', '==', user.email).get().then(function(snap) {
            var name = user.displayName || user.email;
            snap.forEach(function(doc) {
                name = doc.data().name || doc.data().username || name;
            });
            var userEl = document.getElementById('dashboardUserName');
            if (userEl) userEl.textContent = name;
        });
    }
});
// ========== إصلاح أزرار Details في الأدمن ==========
(function() {
    function bindAdminDetails() {
        var allBtns = document.querySelectorAll('#adminPanel button, #adminDynamicContent button');
        allBtns.forEach(function(btn) {
            if (btn.textContent.trim() === '👁️ Details' && !btn.dataset.fixed) {
                btn.dataset.fixed = '1';
                btn.onclick = function() {
                    var parentDiv = btn.parentElement.parentElement;
                    var emailMatch = parentDiv.textContent.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
                    if (emailMatch) {
                        ['loginPage','dashboardPage','notificationsPage','profilePage','adminSettingsPage'].forEach(function(id) {
                            var el = document.getElementById(id);
                            if (el) el.style.display = 'none';
                        });
                        document.getElementById('userDetailsPage').style.display = 'block';
                        if (typeof showUserDetails === 'function') {
                            showUserDetails(emailMatch[0]);
                        }
                    }
                };
            }
        });
    }
    
    // شغل كل 2 ثانية
    setInterval(bindAdminDetails, 2000);
    bindAdminDetails();
})();
// ========== إصلاح أزرار الأدمن (Details, Back) + مربع الرسالة و Send ==========
(function() {
    // 1. ربط Details
    function bindDetails() {
        var allBtns = document.querySelectorAll('#adminPanel button, #adminDynamicContent button');
        allBtns.forEach(function(btn) {
            if (btn.textContent.trim() === '👁️ Details' && !btn.dataset.detailFixed) {
                btn.dataset.detailFixed = '1';
                btn.onclick = function() {
                    var emailMatch = btn.parentElement.parentElement.textContent.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
                    if (emailMatch) {
                        ['loginPage','dashboardPage','notificationsPage','profilePage','adminSettingsPage'].forEach(function(id) {
                            var el = document.getElementById(id);
                            if (el) el.style.display = 'none';
                        });
                        document.getElementById('userDetailsPage').style.display = 'block';
                        if (typeof showUserDetails === 'function') showUserDetails(emailMatch[0]);
                    }
                };
            }
        });
    }

    // 2. ربط Back
    function bindBackButton() {
        var backBtn = document.getElementById('userDetailsBackBtn');
        if (backBtn && !backBtn.dataset.backFixed) {
            backBtn.dataset.backFixed = '1';
            backBtn.onclick = function() {
                document.getElementById('userDetailsPage').style.display = 'none';
                document.getElementById('dashboardPage').style.display = 'block';
                document.getElementById('adminPanel').style.display = 'block';
                if (typeof showAdminPanelPage === 'function') showAdminPanelPage();
            };
        }
    }

    // 3. استبدال مربع الرسالة وربط Send
    function replaceInputAndBindSend() {
        var oldInput = document.getElementById('userMessageInput');
        if (oldInput && oldInput.tagName === 'INPUT' && !oldInput.dataset.newInput) {
            oldInput.dataset.newInput = '1';
            
            var newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.id = 'userMessageInput';
            newInput.placeholder = 'Write your message here...';
            newInput.style.cssText = 'flex:1; padding:12px; font-size:18px; color:#000000 !important; background:#ffffff !important; border:2px solid #1a237e; border-radius:8px; -webkit-text-fill-color:#000000 !important;';
            
            oldInput.replaceWith(newInput);
            
            setTimeout(function() {
                var sendBtn = document.getElementById('sendUserMessageBtn');
                if (sendBtn && !sendBtn.dataset.newSend) {
                    sendBtn.dataset.newSend = '1';
                    sendBtn.onclick = function() {
                        var msg = document.getElementById('userMessageInput').value.trim();
                        var email = sendBtn.getAttribute('data-email');
                        if (!msg) { alert('Please write a message'); return; }
                        alert('✅ Message sent to ' + email + ': ' + msg);
                        document.getElementById('userMessageInput').value = '';
                    };
                }
            }, 500);
        }
    }

    // 4. تشغيل كل شيء
    setInterval(function() {
        bindDetails();
        bindBackButton();
        replaceInputAndBindSend();
    }, 1000);
})();

// إصلاح زر Send to All
setInterval(function() {
    var broadcastBtn = document.querySelector('#broadcastMessage + button');
    if (broadcastBtn && !broadcastBtn.dataset.broadcastFixed) {
        broadcastBtn.dataset.broadcastFixed = '1';
        broadcastBtn.onclick = function() {
            var msg = document.getElementById('broadcastMessage').value;
            if (!msg) { alert('Write a message first'); return; }
            alert('✅ Broadcast sent to all users:\n' + msg);
            document.getElementById('broadcastMessage').value = '';
        };
    }
}, 2000);
// إصلاح Activity Logs - قراءة من Firestore
setInterval(function() {
    firebase.firestore().collection('activityLogs').orderBy('timestamp', 'desc').limit(10).get().then(function(snap) {
        var h3s = document.querySelectorAll('h3');
        h3s.forEach(function(h3) {
            if (h3.textContent.includes('Activity Logs') && !h3.dataset.activityFixed) {
                h3.dataset.activityFixed = '1';
                var parent = h3.closest('div');
                var next = h3.nextElementSibling;
                while(next) {
                    var temp = next.nextElementSibling;
                    next.remove();
                    next = temp;
                }
                
                if (snap.empty) {
                    parent.appendChild(Object.assign(document.createElement('p'), {style: 'color:#999;', textContent: 'No activity'}));
                } else {
                    snap.forEach(function(doc) {
                        var d = doc.data();
                        var div = document.createElement('div');
                        div.style.cssText = 'padding:8px;margin:3px 0;background:#f5f5f5;border-radius:8px;';
                        div.innerHTML = '<strong>' + (d.action || '') + '</strong> - <small>' + (d.user || '') + ' | ' + (d.timestamp ? d.timestamp.toDate().toLocaleString() : '') + '</small>';
                        parent.appendChild(div);
                    });
                }
            }
        });
    });
}, 3000);
// ========== إصلاح الخرائط ==========
setTimeout(function() {
    if (document.getElementById('lostSelectMap') && typeof L !== 'undefined' && !lostSelectMap) {
        lostSelectMap = L.map('lostSelectMap').setView([31.95, 35.91], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(lostSelectMap);
    }
    if (document.getElementById('foundSelectMap') && typeof L !== 'undefined' && !foundSelectMap) {
        foundSelectMap = L.map('foundSelectMap').setView([31.95, 35.91], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(foundSelectMap);
    }
    if (document.getElementById('publicMap') && typeof L !== 'undefined' && !publicMap) {
        publicMap = L.map('publicMap').setView([31.95, 35.91], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(publicMap);
    }
    if (document.getElementById('dashboardMap') && typeof L !== 'undefined' && !dashboardMap) {
        dashboardMap = L.map('dashboardMap').setView([31.95, 35.91], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(dashboardMap);
    }
}, 2000);
// ========== تحميل Lost & Found من Firestore للداشبورد ==========
function loadDashboardItems() {
    var db = firebase.firestore();
    
    // تحميل Lost Items
    db.collection('lostItems').get().then(function(s) {
        lostArray = [];
        s.forEach(function(d) {
            var data = d.data();
            data.images = data.image ? [data.image] : [];
            data.type = 'lost';
            lostArray.push({ id: d.id, ...data });
        });
        if (typeof renderDashboardData === 'function') renderDashboardData();
    });
    
    // تحميل Found Items
    db.collection('foundItems').get().then(function(s) {
        foundArray = [];
        s.forEach(function(d) {
            var data = d.data();
            data.images = data.image ? [data.image] : [];
            data.type = 'found';
            foundArray.push({ id: d.id, ...data });
        });
        if (typeof renderDashboardData === 'function') renderDashboardData();
    });
}

// تحميل عند الدخول
loadDashboardItems();

// ربط showMatches مع renderDashboardData
var originalRender = renderDashboardData;
renderDashboardData = function() {
    originalRender();
    setTimeout(function() {
        showMatches();
    }, 500);
};
// تحديث كل دقيقة
setInterval(loadDashboardItems, 60000);
// ========== بطاقة Matches الذكية ==========
function showMatches() {
    var matches = [];
    lostArray.forEach(function(l) {
        foundArray.forEach(function(f) {
            if (typeof isSimilar === 'function' && (isSimilar(l.desc, f.desc) || l.city === f.city)) {
                var score = 0;
                if (isSimilar(l.desc, f.desc)) score += 60;
                if (l.city === f.city) score += 25;
                if (l.category === f.category) score += 15;
                matches.push({ lost: l, found: f, score: score });
            }
        });
    });
    
    matches.sort(function(a, b) { return b.score - a.score; });
    
    var container = document.getElementById('dashMatches');
    if (!container) return;
    
    if (matches.length === 0) {
        container.innerHTML = '<p style="color:var(--text-light);">No matches yet</p>';
        return;
    }
    
    container.innerHTML = matches.map(function(m) {
        var lostName = m.lost.name || m.lost.userEmail || 'Unknown';
        var foundName = m.found.name || m.found.userEmail || 'Unknown';
        return `
        <div style="background:linear-gradient(135deg, #e8f5e9, #f3e5f5); border-radius:16px; padding:16px; margin:10px 0; box-shadow:0 2px 10px rgba(0,0,0,0.1); border-left:5px solid #8e44ad;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <span style="font-weight:bold; font-size:18px;">🎯 ${m.score}% Match</span>
                <div style="display:flex; gap:6px;">
                    <button onclick="connectMatch('${m.lost.id}', '${m.found.id}', '${lostName}', '${foundName}')" style="padding:8px 16px; background:#8e44ad; color:white; border:none; border-radius:8px; cursor:pointer;">🤝 Connect</button>
                    <button onclick="shareMatch('${m.lost.id}', '${m.found.id}')" style="padding:8px 16px; background:#3498db; color:white; border:none; border-radius:8px; cursor:pointer;">📤 Share</button>
                </div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div style="background:white; padding:12px; border-radius:12px; border-left:4px solid #e74c3c;">
                    <strong>🔴 Lost</strong><br>
                    ${m.lost.images?.[0] ? `<img src="${m.lost.images[0]}" style="width:100%; height:80px; object-fit:cover; border-radius:8px; margin:8px 0;">` : ''}
                    <div><strong>${m.lost.desc}</strong></div>
                    <small>📍 ${m.lost.city} | 📅 ${m.lost.date}</small><br>
                    <small>👤 <strong>${lostName}</strong></small>
                </div>
                <div style="background:white; padding:12px; border-radius:12px; border-left:4px solid #27ae60;">
                    <strong>✅ Found</strong><br>
                    ${m.found.images?.[0] ? `<img src="${m.found.images[0]}" style="width:100%; height:80px; object-fit:cover; border-radius:8px; margin:8px 0;">` : ''}
                    <div><strong>${m.found.desc}</strong></div>
                    <small>📍 ${m.found.city} | 📅 ${m.found.date}</small><br>
                    <small>👤 <strong>${foundName}</strong></small>
                </div>
            </div>
        </div>`;
    }).join('');
}

window.connectMatch = function(lostId, foundId, lostName, foundName) {
    alert('🎯 Match Found!\n\n🔴 Lost by: ' + lostName + '\n✅ Found by: ' + foundName + '\n\nBoth users will be notified.');
};
window.shareMatch = function(lostId, foundId) {
    alert('📤 Match shared!');
};

// تحميل Matches تلقائياً بعد تحميل البيانات
setTimeout(function() {
    if (typeof showMatches === 'function') showMatches();
}, 3000);
// ========== تحسينات الداشبورد - الفلاتر، البحث، التنسيق ==========
(function() {
    function applyDashboardMods() {
        // 1. البطاقات 3 أعمدة
        var statsGrid = document.querySelector('.stats-grid, .quick-stats');
        if (statsGrid) {
            statsGrid.style.display = 'grid';
            statsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            statsGrid.style.gap = '12px';
        }

        // 2. إخفاء الفلاتر القديمة
        document.querySelectorAll('#filterCategory, #filterTime, #filterCountry, #filterCity').forEach(function(el) {
            var parent = el.parentElement;
            if (parent) parent.style.display = 'none';
        });
        document.querySelectorAll('#resetFiltersBtn, #nearMeBtn, #filterRewardBtn, #promoteReportBtn, #refreshDashboardBtn, #dashboardBackupBtn, #dashboardRestoreBtn').forEach(function(el) {
            el.style.display = 'none';
        });

        // 3. نقل شريط البحث تحت الخريطة وتكبيره
        var searchInput = document.querySelector('#dashboardPage input[placeholder*="Search"]');
        var mapEl = document.getElementById('dashboardMap') || document.querySelector('.map-container, [id*="map"]');
        if (searchInput && mapEl) {
            var searchWrapper = searchInput.parentElement;
            mapEl.parentNode.insertBefore(searchWrapper, mapEl.nextSibling);
            searchInput.style.padding = '14px';
            searchInput.style.fontSize = '16px';
            searchInput.style.border = '2px solid #1a237e';
            searchInput.style.borderRadius = '10px';
            searchInput.style.width = '100%';
            searchInput.placeholder = '🔍 Search all reports...';
        }

        // 4. إضافة الفلاتر الجديدة
        if (mapEl && !document.getElementById('newFiltersBar')) {
            var filtersDiv = document.createElement('div');
            filtersDiv.id = 'newFiltersBar';
            filtersDiv.style.cssText = 'margin:12px 0; display:flex; gap:8px; flex-wrap:wrap;';
            filtersDiv.innerHTML = `
                <select id="filterCountryNew2" style="padding:8px; border-radius:6px; border:1px solid #ccc; flex:1; min-width:100px;"><option value="">🌍 All Countries</option></select>
                <select id="filterCityNew2" style="padding:8px; border-radius:6px; border:1px solid #ccc; flex:1; min-width:100px;"><option value="">🏙 All Cities</option></select>
                <select id="filterTimeNew2" style="padding:8px; border-radius:6px; border:1px solid #ccc; flex:1; min-width:80px;"><option value="all">📅 All</option><option value="today">Today</option><option value="week">Week</option></select>
                <button id="nearMeNewBtn" style="padding:8px 14px; background:#e74c3c; color:white; border:none; border-radius:6px; cursor:pointer;">📍 NEAR ME</button>
                <button id="rewardNewBtn" style="padding:8px 14px; background:#f39c12; color:white; border:none; border-radius:6px; cursor:pointer;">💰 Reward</button>
                <button id="promoteNewBtn" style="padding:8px 14px; background:linear-gradient(135deg,#f0a500,#d68910); color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">⭐ Promote</button>
                <button id="resetNewBtn" style="padding:8px 14px; background:#999; color:white; border:none; border-radius:6px; cursor:pointer;">🔄 Reset</button>
            `;
            mapEl.parentNode.insertBefore(filtersDiv, mapEl.nextSibling);

            // تعبئة الدول
            var countrySelect = document.getElementById('filterCountryNew2');
            if (countrySelect && typeof geoData !== 'undefined') {
                geoData.forEach(function(c) {
                    countrySelect.appendChild(new Option(c.name, c.name));
                });
            }

            // تفعيل الأزرار
            document.getElementById('nearMeNewBtn').onclick = function() {
    toggleNearMeFilter();
    setTimeout(updateNearMeButton, 1000);
};
            let showRewardOnly = false;
let showPromoteOnly = false;

function updateFilterButtons() {
    var rBtn = document.getElementById('rewardNewBtn');
    var pBtn = document.getElementById('promoteNewBtn');
    if (rBtn) {
        rBtn.innerHTML = showRewardOnly ? '✅ 💰 Reward' : '💰 Reward';
        rBtn.style.background = showRewardOnly ? '#f39c12' : '';
    }
    if (pBtn) {
        pBtn.innerHTML = showPromoteOnly ? '✅ ⭐ Promote' : '⭐ Promote';
        pBtn.style.background = showPromoteOnly ? '#f39c12' : '';
    }
}

document.getElementById('rewardNewBtn').onclick = function() {
    showRewardOnly = !showRewardOnly;
    if (showRewardOnly) showPromoteOnly = false;
    updateFilterButtons();
};

document.getElementById('promoteNewBtn').onclick = function() {
    showPromoteOnly = !showPromoteOnly;
    if (showPromoteOnly) showRewardOnly = false;
    updateFilterButtons();
};
            document.getElementById('resetNewBtn').onclick = function() {
                document.getElementById('filterCountryNew2').value = '';
                document.getElementById('filterCityNew2').value = '';
                document.getElementById('filterTimeNew2').value = 'all';
                if (searchInput) searchInput.value = '';
            };
        }
    }

    // تطبيق عند التحميل
    applyDashboardMods();

    // إعادة تطبيق عند الحاجة
        // حماية شريط البحث من إعادة البناء
    var searchInput = document.querySelector('#dashboardPage input[placeholder*="Search"]');
    if (searchInput && !searchInput.dataset.searchFixed) {
        searchInput.dataset.searchFixed = '1';
        var newInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newInput, searchInput);
        
        newInput.addEventListener('input', function(e) {
            e.stopPropagation();
            var keyword = this.value.trim().toLowerCase();
            var allCards = document.querySelectorAll('#dashboardPage .card, #dashboardPage [class*="item"], #dashboardPage [class*="report"]');
            var found = 0;
            allCards.forEach(function(card) {
                var text = (card.innerText || card.textContent || '').toLowerCase();
                card.style.display = (!keyword || text.includes(keyword)) ? '' : 'none';
                if (!keyword || text.includes(keyword)) found++;
            });
                        console.log('🔍 "' + keyword + '" → Found: ' + found);
        });
    }
})();
// ========== صفحة البروفايل ==========
function openProfile() {
    var u = firebase.auth().currentUser;
    if (!u) return;
    var page = document.getElementById('profilePage');
    var dash = document.getElementById('dashboardPage');
    
    firebase.firestore().collection('users').where('email', '==', u.email).get().then(function(snap) {
        var data = snap.empty ? {} : snap.docs[0].data();
        var name = data.name || u.displayName || u.email;
        var points = data.points || 0;
        var level = points < 10 ? '🟢 Beginner' : points < 50 ? '🔵 Intermediate' : points < 100 ? '🟣 Advanced' : '👑 Pro';
        
        page.innerHTML = '<div class="top-nav"><div class="nav-brand">👤 Profile</div><div class="nav-actions"><button id="profBackBtn">← Back</button></div></div>' +
        '<div style="text-align:center;padding:20px;">' +
        '<div style="font-size:60px;">👤</div>' +
        '<h2>' + name + '</h2>' +
        '<p>📧 ' + u.email + '</p>' +
        '<p style="font-size:20px;">' + level + '</p>' +
        '<p style="font-size:36px;font-weight:bold;color:#1a237e;">⭐ ' + points + ' Points</p>' +
        '<button onclick="firebase.auth().signOut()" style="padding:12px 24px;background:#e74c3c;color:white;border:none;border-radius:8px;margin:5px;">🚪 Logout</button>' +
        '<button onclick="requestDeleteAccount()" style="padding:12px 24px;background:#999;color:white;border:none;border-radius:8px;margin:5px;">🗑️ Request Delete</button>' +
        '</div>';
        
        page.style.display = 'block';
        dash.style.display = 'none';
        document.getElementById('profBackBtn').onclick = function() {
            page.style.display = 'none';
            dash.style.display = 'block';
        };
    });
}

window.requestDeleteAccount = function() {
    if (confirm('Request account deletion? Admin will review.')) {
        var u = firebase.auth().currentUser;
        if (u) {
            firebase.firestore().collection('deleteRequests').add({
                email: u.email,
                requestedAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(function() {
                alert('✅ Request sent to admin');
            });
        }
    }
};

// ربط زر البروفايل
setInterval(function() {
    var btn = document.getElementById('dashboardProfileBtn');
    if (btn && !btn.dataset.profLinked) {
        btn.dataset.profLinked = '1';
        btn.onclick = openProfile;
    }
}, 1000);
// ============================================
// SEND MESSAGE SYSTEM
// ============================================
(function() {
    function sendMessageToUser(userEmail, userName) {
        var message = prompt('Enter message to send to ' + userName + ' (' + userEmail + '):');
        if (!message || !message.trim()) return;
        firebase.firestore().collection('messages').add({
            to: userEmail, toName: userName, message: message.trim(),
            from: 'admin', fromName: 'Admin',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), read: false
        }).then(function() {
            alert('✅ Message sent to ' + userName);
        }).catch(function(error) {
            alert('❌ Error: ' + error.message);
        });
    }

    function linkSendMessageButtons() {
        document.querySelectorAll('button').forEach(function(btn) {
            if (btn.textContent.includes('Send Message') && !btn.dataset.msgLinked) {
                btn.dataset.msgLinked = '1';
                var p = btn.parentElement.parentElement;
                var txt = p ? p.innerText : '';
                var em = txt.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
                var email = em ? em[0] : '';
                var name = email ? txt.split(email)[0].replace(/[()]/g,'').trim() : '';
                if(!name) name = email.split('@')[0];
                btn.onclick = function(e){ e.preventDefault(); e.stopPropagation(); sendMessageToUser(email, name); };
                console.log('🔗 ' + name + ' (' + email + ')');
            }
        });
    }

    setInterval(linkSendMessageButtons, 1500);
    console.log('⏳ Send Message system started');
})();
setTimeout(function() {
    for (var i = 1; i < 99999; i++) clearInterval(i);
    var searchInput = document.querySelector('#dashboardPage input[placeholder*="Search"]');
    if (searchInput && !searchInput.dataset.searchFixed) {
        searchInput.dataset.searchFixed = '1';
        var newInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newInput, searchInput);
        newInput.addEventListener('input', function(e) {
            e.stopPropagation();
            var keyword = this.value.trim().toLowerCase();
            var allCards = document.querySelectorAll('#dashboardPage .card, #dashboardPage [class*="item"], #dashboardPage [class*="report"]');
            var found = 0;
            allCards.forEach(function(card) {
                var text = (card.innerText || card.textContent || '').toLowerCase();
                card.style.display = (!keyword || text.includes(keyword)) ? '' : 'none';
                if (!keyword || text.includes(keyword)) found++;
            });
            console.log('🔍 "' + keyword + '" → Found: ' + found);
        });
        console.log('✅ Search auto-fixed');
    }
}, 4000);

setInterval(function() { showMatches(); }, 30000);
document.getElementById('dashboardProfileBtn').addEventListener('click', function() {
    var u = currentUser;
    if (!u) return;
    document.getElementById('dashboardPage').classList.add('hidden');
    document.getElementById('profilePage').classList.remove('hidden');
    var c = document.getElementById('profileContent');
    c.innerHTML = '<div class="profile-card"><div class="profile-avatar">👤</div><div class="profile-name">' + (u.name || u.email) + '</div><div class="profile-level">🟢 Beginner</div><div class="profile-stats"><div class="profile-stat"><div class="profile-stat-num">0</div><div class="profile-stat-label">📦 Lost</div></div><div class="profile-stat"><div class="profile-stat-num">0</div><div class="profile-stat-label">✅ Found</div></div><div class="profile-stat"><div class="profile-stat-num">0</div><div class="profile-stat-label">⭐ Points</div></div></div></div>';
});
document.getElementById('showRegisterBtn').onclick = function(e) {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('orgRegisterForm').style.display = 'none';
};

document.getElementById('submitRegisterBtn').onclick = function() {
    var name = document.getElementById('regName').value.trim();
    var email = document.getElementById('regEmail').value.trim();
    var pwd = document.getElementById('regPwd').value;
    
    if (!name || !email || !pwd) {
        alert('Please fill all fields');
        return;
    }
    
    firebase.firestore().collection('pendingUsers').add({
        name: name,
        email: email,
        password: pwd,
        approved: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function() {
        alert('✅ Registration submitted! Wait for admin approval.');
        document.getElementById('registerForm').style.display = 'none';
    }).catch(function(error) {
        alert('❌ Error: ' + error.message);
    });
};
document.getElementById('showOrgRegisterBtn').onclick = function(e) {
    e.preventDefault();
    document.getElementById('orgRegisterForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
};

document.getElementById('submitOrgRegisterBtn').onclick = function() {
    var name = document.getElementById('orgName').value.trim();
    var type = document.getElementById('orgType').value;
    var email = document.getElementById('orgEmail').value.trim();
    var phone = document.getElementById('orgPhone').value.trim();
    var pwd = document.getElementById('orgPassword').value;
    
    if (!name || !pwd || (!email && !phone)) {
        alert('Please fill all fields');
        return;
    }
    
    firebase.firestore().collection('pendingOrganizations').add({
        name: name,
        type: type,
        email: email,
        phone: phone,
        password: pwd,
        approved: false,
        isAdmin: false,
        isOrganization: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function() {
        alert('✅ Organization registration submitted!');
        document.getElementById('orgRegisterForm').style.display = 'none';
    }).catch(function(error) {
        alert('❌ Error: ' + error.message);
    });
};
window._approveOrg = async function(orgId) {
    const db = firebase.firestore();
    const docRef = db.collection('pendingOrganizations').doc(orgId);
    const doc = await docRef.get();
    if (doc.exists) {
        const data = doc.data();
        data.approved = true;
        data.isOrganization = true;
        data.role = 'organization';
        await db.collection('users').add(data);
        await docRef.delete();
        alert('✅ Organization approved!');
        refreshAdminPanel();
    }
};

window._rejectOrg = function(orgId) {
    if (!confirm('Delete this organization request?')) return;
    firebase.firestore().collection('pendingOrganizations').doc(orgId).delete().then(function() {
        alert('🗑️ Organization deleted!');
        refreshAdminPanel();
    });
};
// ========== دوال Pending Reports ==========
window._approvePendingReport = function(id) {
    if (!confirm('Approve this report and move to dashboard?')) return;
    var db = firebase.firestore();
    var numericId = parseInt(id);
    db.collection('pendingReports').where('id', '==', numericId).get().then(function(snapshot) {
        if (snapshot.empty) {
            alert('❌ Report not found');
            return;
        }
        snapshot.forEach(function(doc) {
            var data = doc.data();
            var collection = data.type === 'lost' ? 'lostItems' : 'foundItems';
            db.collection(collection).add(data).then(function() {
                doc.ref.delete().then(function() {
                    var el = document.querySelector('[onclick*="' + id + '"]');
                    if (el) {
                        var parent = el.closest('div[style*="display:flex;justify-content:space-between"]');
                        if (parent) parent.remove();
                    }
                    alert('✅ Report approved and moved to dashboard');
                });
            });
        });
    }).catch(function(error) {
        console.error('Error:', error);
        alert('❌ Error: ' + error.message);
    });
};

window._deletePendingReport = function(id) {
    if (!confirm('Delete this report permanently?')) return;
    var db = firebase.firestore();
    var numericId = parseInt(id);
    db.collection('pendingReports').where('id', '==', numericId).get().then(function(snapshot) {
        if (snapshot.empty) {
            alert('❌ Report not found');
            return;
        }
        snapshot.forEach(function(doc) {
            doc.ref.delete().then(function() {
                var el = document.querySelector('[onclick*="' + id + '"]');
                if (el) {
                    var parent = el.closest('div[style*="display:flex;justify-content:space-between"]');
                    if (parent) parent.remove();
                }
                alert('🗑️ Report deleted');
            });
        });
    }).catch(function(error) {
        console.error('Error:', error);
        alert('❌ Error: ' + error.message);
    });
};
// ========================================
// Login Page Layout - خريطة يسار + فورم يمين
// ========================================
window.addEventListener('load', function() {
    if (document.getElementById('loginPage')) {
        // 1. عكس الاتجاه
        document.getElementById('loginPage').style.cssText = 'display:flex;flex-direction:row-reverse;align-items:stretch;height:100vh;overflow:hidden;';
        
        // 2. الفورم - خلفية بيضا
        var loginContainer = document.querySelector('.login-container');
        loginContainer.style.cssText = 'flex:1;overflow-y:auto;background:white;display:flex;justify-content:center;align-items:flex-start;padding:0;';
        
        var loginCard = document.querySelector('.login-card');
        loginCard.style.cssText = 'width:100%;max-width:100%;margin:0;border-radius:0;box-shadow:none;padding:20px;box-sizing:border-box;';
        
        document.body.style.cssText = 'margin:0;padding:0;';
        
        // 3. الخريطة
        var hero = document.querySelector('.login-hero');
        hero.style.cssText = 'flex:1;position:relative;overflow:hidden;';
        hero.style.backgroundImage = 'none';
        hero.style.backgroundColor = '#1a237e';
        
        var mapEl = document.getElementById('publicMap');
        if (mapEl) {
            if (!hero.contains(mapEl)) {
                hero.appendChild(mapEl);
            }
            mapEl.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;border-radius:12px;z-index:1;';
        }
        
        // ✨ نستنى الخريطة تتجهز بعدين نضبط ارتفاعها
        function fixHeight() {
            var formHeight = loginContainer.scrollHeight;
            hero.style.height = formHeight + 'px';
            hero.style.display = 'flex';
            if (mapEl && mapEl._leaflet_map) {
                mapEl._leaflet_map.invalidateSize();
            }
            console.log('Map height set to:', formHeight);
        }
        
        if (typeof publicMap !== 'undefined' && publicMap) {
            publicMap.whenReady(function() {
                setTimeout(fixHeight, 500);
            });
        } else {
            var checkMap = setInterval(function() {
                if (typeof publicMap !== 'undefined' && publicMap) {
                    clearInterval(checkMap);
                    publicMap.whenReady(function() {
                        setTimeout(fixHeight, 500);
                    });
                }
            }, 200);
        }
        
        // 4. أزرار [+][-]
        if (!document.getElementById('zoomInBtn')) {
            var zoomControls = document.createElement('div');
            zoomControls.style.cssText = 'position:absolute;bottom:50px;left:10px;z-index:1000;display:flex;gap:5px;';
            zoomControls.innerHTML = '<button id="zoomInBtn" style="width:35px;height:35px;background:#1a237e;color:white;border:none;border-radius:6px;font-size:18px;cursor:pointer;font-weight:bold;">+</button><button id="zoomOutBtn" style="width:35px;height:35px;background:#1a237e;color:white;border:none;border-radius:6px;font-size:18px;cursor:pointer;font-weight:bold;">−</button>';
            hero.appendChild(zoomControls);
            
            var currentZoom = 1;
            document.getElementById('zoomInBtn').onclick = function() {
                currentZoom += 0.1;
                mapEl.style.transform = 'scale(' + currentZoom + ')';
                mapEl.style.transformOrigin = 'center center';
            };
            document.getElementById('zoomOutBtn').onclick = function() {
                if (currentZoom > 0.5) {
                    currentZoom -= 0.1;
                    mapEl.style.transform = 'scale(' + currentZoom + ')';
                    mapEl.style.transformOrigin = 'center center';
                }
            };
        }
        
                        // 5. إخفاء النص وصورة الشخصين
        var allP = loginCard.querySelectorAll('p');
        allP.forEach(function(p) {
            if (p.innerText.includes('Live global activity')) {
                p.remove();
            }
        });
        
        var existingImg = loginCard.querySelector('div[style*="postimg"]');
        if (existingImg) existingImg.remove();
        
        var tagline = loginCard.querySelector('p');
        var personImg = document.createElement('div');
personImg.style.cssText = 'height:300px;width:110%;margin-left:-5%;background-image:url(https://i.postimg.cc/nrHrRZnv/Chat-GPT-Image-May-6-2026-02-11-58-PM.png);background-size:cover;background-position:center 55%;border-radius:15px;margin-top:15px;margin-bottom:15px;';        if (tagline && tagline.nextSibling) {
            tagline.parentNode.insertBefore(personImg, tagline.nextSibling);
        } else if (tagline) {
            tagline.parentNode.appendChild(personImg);
        }
        
        console.log('Login layout applied');
    }
});
// ========================================
// شريط الإعلانات أسفل الصفحة
// ========================================
window.addEventListener('load', function() {
    var adBar = document.getElementById('adBar');
    if (adBar) { adBar.remove(); }

    var adBanner = document.getElementById('adBanner');
    if (adBanner) {
        adBanner.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;text-align:center;z-index:9999;background:#1a237e;color:white;padding:10px;font-size:13px;display:flex;justify-content:center;align-items:center;gap:15px;flex-wrap:wrap;';
        adBanner.innerHTML = '🔍 Lost & Found Pro - Help us continue &nbsp;|&nbsp; ⭐ Subscribe Premium &nbsp;|&nbsp; ❤️ Donate &nbsp;|&nbsp; 📢 Your Ad Here - Contact us';
    }
});
// ========== تفعيل الرسوم البيانية في لوحة الأدمن ==========
function renderAdminCharts() {
    // 1. التحقق من وجود Chart.js
    if (typeof Chart === 'undefined') {
        // تحميل Chart.js إذا لم يكن موجوداً
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            createCharts();
        };
        document.head.appendChild(script);
    } else {
        createCharts();
    }
}

function createCharts() {
    var db = firebase.firestore();
    
    // جلب البيانات
    db.collection('lostItems').get().then(function(lostSnap) {
        db.collection('foundItems').get().then(function(foundSnap) {
            var lostData = {};
            var foundData = {};
            
            lostSnap.forEach(function(doc) {
                var date = doc.data().date || 'N/A';
                lostData[date] = (lostData[date] || 0) + 1;
            });
            
            foundSnap.forEach(function(doc) {
                var date = doc.data().date || 'N/A';
                foundData[date] = (foundData[date] || 0) + 1;
            });
            
            var allDates = [...new Set([...Object.keys(lostData), ...Object.keys(foundData)])].sort();
            var last7Dates = allDates.slice(-7);
            
            var lostValues = last7Dates.map(function(d) { return lostData[d] || 0; });
            var foundValues = last7Dates.map(function(d) { return foundData[d] || 0; });
            
            // 1. رسم Lost vs Found
            var ctx1 = document.getElementById('lostFoundChart');
            if (ctx1) {
                new Chart(ctx1, {
                    type: 'bar',
                    data: {
                        labels: last7Dates,
                        datasets: [
                            {
                                label: 'Lost',
                                data: lostValues,
                                backgroundColor: '#e74c3c',
                                borderRadius: 5
                            },
                            {
                                label: 'Found',
                                data: foundValues,
                                backgroundColor: '#27ae60',
                                borderRadius: 5
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' }
                        }
                    }
                });
            }
            
            // 2. رسم Category (الأقسام)
            var categories = {};
            lostSnap.forEach(function(doc) {
                var cat = doc.data().category || 'other';
                categories[cat] = (categories[cat] || 0) + 1;
            });
            foundSnap.forEach(function(doc) {
                var cat = doc.data().category || 'other';
                categories[cat] = (categories[cat] || 0) + 1;
            });
            
            var ctx2 = document.getElementById('categoryChart');
            if (ctx2) {
                new Chart(ctx2, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(categories),
                        datasets: [{
                            data: Object.values(categories),
                            backgroundColor: ['#e74c3c', '#27ae60', '#3498db', '#f39c12', '#8e44ad', '#1abc9c']
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'right' }
                        }
                    }
                });
            }
        });
    });
}

// تشغيل عند تحميل الأدمن
setTimeout(function() {
    renderAdminCharts();
}, 2000);
// ========== رسم الأعمدة والدائرة بألوان نيونية زاهية جداً ==========
function createRealCharts() {
    if (typeof Chart === 'undefined') {
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() { buildCharts(); };
        document.head.appendChild(script);
    } else {
        buildCharts();
    }
}

function buildCharts() {
    var db = firebase.firestore();
    
    db.collection('lostItems').get().then(function(lostSnap) {
        db.collection('foundItems').get().then(function(foundSnap) {
            var lostData = {};
            var foundData = {};
            var categories = {};
            
            lostSnap.forEach(function(doc) {
                var date = doc.data().date || 'N/A';
                lostData[date] = (lostData[date] || 0) + 1;
                var cat = doc.data().category || 'other';
                categories[cat] = (categories[cat] || 0) + 1;
            });
            
            foundSnap.forEach(function(doc) {
                var date = doc.data().date || 'N/A';
                foundData[date] = (foundData[date] || 0) + 1;
                var cat = doc.data().category || 'other';
                categories[cat] = (categories[cat] || 0) + 1;
            });
            
            var allDates = [...new Set([...Object.keys(lostData), ...Object.keys(foundData)])].sort();
            var last7Dates = allDates.slice(-7);
            var lostValues = last7Dates.map(function(d) { return lostData[d] || 0; });
            var foundValues = last7Dates.map(function(d) { return foundData[d] || 0; });
            
            var chartDivs = document.querySelectorAll('#adminDynamicContent div[style*="background:#f9f9f9"]');
            
            if (chartDivs.length >= 2) {
                // 1. الأعمدة بألوان نيونية زاهية
                var canvas1 = document.createElement('canvas');
                canvas1.id = 'lostFoundChart_' + Date.now();
                chartDivs[0].innerHTML = '';
                chartDivs[0].style.background = '#0a0a2a';
                chartDivs[0].style.padding = '20px';
                chartDivs[0].style.borderRadius = '16px';
                chartDivs[0].appendChild(canvas1);
                
                new Chart(canvas1, {
                    type: 'bar',
                    data: {
                        labels: last7Dates,
                        datasets: [
                            {
                                label: '🔴 Lost',
                                data: lostValues,
                                backgroundColor: '#ff0730',
                                borderColor: '#ff0730',
                                borderWidth: 2,
                                borderRadius: 6,
                                hoverBackgroundColor: '#ff6b81'
                            },
                            {
                                label: '🟢 Found',
                                data: foundValues,
                                backgroundColor: '#39ff14',
                                borderColor: '#39ff14',
                                borderWidth: 2,
                                borderRadius: 6,
                                hoverBackgroundColor: '#7bed9f'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#ffffff',
                                    font: { size: 14, weight: 'bold' }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 1, color: '#ffffff' },
                                grid: { color: 'rgba(255,255,255,0.1)' }
                            },
                            x: {
                                ticks: { color: '#ffffff' },
                                grid: { color: 'rgba(255,255,255,0.1)' }
                            }
                        }
                    }
                });
                
                // 2. الدائرة بألوان نيونية زاهية
                var canvas2 = document.createElement('canvas');
                canvas2.id = 'categoryChart_' + Date.now();
                chartDivs[1].innerHTML = '';
                chartDivs[1].style.background = '#0a0a2a';
                chartDivs[1].style.padding = '20px';
                chartDivs[1].style.borderRadius = '16px';
                chartDivs[1].appendChild(canvas2);
                
                var categoryLabels = Object.keys(categories);
                var categoryValues = Object.values(categories);
                var neonColors = [
                    '#ff0730', // أحمر نيون
                    '#39ff14', // أخضر نيون
                    '#00ffff', // فيروزي نيون
                    '#ff00ff', // وردي نيون
                    '#ffff00', // أصفر نيون
                    '#ff6600', // برتقالي نيون
                    '#9900ff', // بنفسجي نيون
                    '#00ff99'  // أزرق نيون
                ];
                
                new Chart(canvas2, {
                    type: 'pie',
                    data: {
                        labels: categoryLabels,
                        datasets: [{
                            data: categoryValues,
                            backgroundColor: neonColors.slice(0, categoryLabels.length),
                            borderColor: '#0a0a2a',
                            borderWidth: 3,
                            hoverOffset: 15
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    color: '#ffffff',
                                    font: { size: 13, weight: 'bold' },
                                    padding: 15
                                }
                            }
                        }
                    }
                });
            }
        });
    });
}

// تشغيل
createRealCharts();
// ========== إعادة رسم الرسوم البيانية تلقائياً ==========
function autoRenderCharts() {
    var observer = new MutationObserver(function() {
        setTimeout(function() {
            createRealCharts();
        }, 500);
    });
    
    var target = document.getElementById('adminDynamicContent');
    if (target) {
        observer.observe(target, { childList: true, subtree: true });
    }
}

// تشغيل المراقبة
setTimeout(function() {
    autoRenderCharts();
    setTimeout(function() {
        createRealCharts();
    }, 1000);
}, 2000);

console.log('✅ All fixes applied');
