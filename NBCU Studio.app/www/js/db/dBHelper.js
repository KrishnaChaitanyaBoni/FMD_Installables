

var sorceService,destService;
var ua = navigator.userAgent;
var destServiceName;
var platform = {
iphone: ua.match(/(iPhone|iPod|iPad)/),
android: ua.match(/Android/)
};

 
function createTables() {
    myDB.transaction(function(transaction) {    
    transaction.executeSql("CREATE TABLE IF NOT EXISTS location(location_id INTEGER PRIMARY KEY AUTOINCREMENT,location_code TEXT,location_name TEXT);");
	transaction.executeSql("CREATE TABLE IF NOT EXISTS department(department_id INTEGER PRIMARY KEY AUTOINCREMENT,department_code TEXT,department_name TEXT,location_id INTEGER,FOREIGN KEY(location_id) REFERENCES location(location_id) ON DELETE CASCADE);");
	transaction.executeSql("CREATE TABLE IF NOT EXISTS directory(directory_id INTEGER PRIMARY KEY AUTOINCREMENT,location_id INTEGER,contact_person1 TEXT,contact_person2 TEXT,department_id INTEGER,email1 TEXT,email2 TEXT,fax TEXT,phone_number1 TEXT,phone_number2 TEXT,bldg_specific_number TEXT,work_time TEXT, description TEXT, department_service_name TEXT,bldg_number TEXT, FOREIGN KEY(location_id) REFERENCES location(location_id) ON DELETE CASCADE,FOREIGN KEY(department_id) REFERENCES department(department_id) ON DELETE CASCADE);");
	transaction.executeSql("CREATE TABLE IF NOT EXISTS film_set_group(film_set_group_id INTEGER PRIMARY KEY AUTOINCREMENT,film_set_group_code TEXT,film_set_group_name TEXT);");
    transaction.executeSql("CREATE TABLE IF NOT EXISTS film_set(film_set_id INTEGER PRIMARY KEY AUTOINCREMENT,location_id INTEGER,film_set_code TEXT,film_set_name TEXT,film_set_group_id INTEGER,backlot_category_name TEXT,area INTEGER,length TEXT,width TEXT,height TEXT,pits_tanks TEXT,silentac_audience TEXT,wireless_internet TEXT,pointload TEXT,FOREIGN KEY(location_id) REFERENCES location(location_id) ON DELETE CASCADE,FOREIGN KEY(film_set_group_id) REFERENCES film_set_group (film_set_group_id) ON DELETE CASCADE);");
    transaction.executeSql("CREATE TABLE IF NOT EXISTS mapslocations(maps_location_id INTEGER PRIMARY KEY AUTOINCREMENT,filmset_id INTEGER,directory_id INTEGER,building_number Text,general_location_cat_name TEXT,category_name TEXT,display_name Text ,latitude TEXT,longitude TEXT,FOREIGN KEY(filmset_id) REFERENCES filmset(filmset_id) ON DELETE CASCADE,FOREIGN KEY(directory_id) REFERENCES directory(directory_id) ON DELETE CASCADE);");
	  });
}

function insertRecords(){
  myDB.transaction(function(transaction) {
		localStorage.setItem("updationSeqNum", 0); // For App Update

    //Location Table
transaction.executeSql('INSERT INTO location(location_code,location_name) VALUES (?,?)', ["USCA","Universal Studios"]);
transaction.executeSql('INSERT INTO location(location_code,location_name) VALUES (?,?)', ["NBCNY","New York"]);
transaction.executeSql('INSERT INTO location(location_code,location_name) VALUES (?,?)', ["NBCC","Chicago"]);

    //Department Table
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["USCA1","Production Services",1]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["USCA2","Post-Production Services",1]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["USCA3","Working on the Lot",1]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["USCA4","Special Events",1]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["USCA5","Additional Services",1]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["USCA6","Universal Digital Services",1]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["USCA7","Post Production Media Services",1]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["NBCNY1","Production Services",2]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["NBCNY2","Post Production Media Services",2]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["NBCNY3","Special Events",2]);
transaction.executeSql('INSERT INTO department(department_code,department_name,location_id) VALUES (?,?,?)', ["NBCC1","Production Services",3]);
   
//Directory Table

//Directory Table

transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"","",1,"universal.locations@nbcuni.com","","818.866.0293","1.818.777.3000","","4250-3","8AM-6PM / Locations available 24 hrs","Backlot- Over 30 Backlot Locations including New York Area/European/Mexican/Denver","Backlot Locations","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"","",1,"universal.locations@nbcuni.com","","818.866.0293","1.818.777.3000","","4250/3","8AM to 6PM","30 Sound Stages ranging from 6,800 sq ft - 29,000 sq ft/Wireless Acess/Pits/Some with Silent Air Conditioning","Sound Stages","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Rick Maas","",1,"universal.setlighting@nbcuni.com","","818.866.0105","1.818.777.1590","1.818.777.2291","4250/1","7AM to 5:30PM","Extensive Inventory / Custom Made Equipment / LED Lighting","Set Lighting","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Mark Kozlowski","",1,"studio.operations2@nbcuni.com","","","1.818.777.2351","","4250-1","6AM-2:30PM","All set and scenic finishes / faux finishing including paper, marble, woodgrain / backlot and stage sets / antique and furniture restoration / paint mixing / furniture spray booth / auto spray booth / paint disposal","Paint Shop","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Beverly Hadley","",1,"universal.property@nbcuni.com","","818.866.1543","1.818.777.2784","","8166/1","6AM to 5PM","Hand and Furniture props / draper- rental and manufacturing / hardware / light fixtures / tassles / upholstery / computerized inventory control / 2 freight elevators / open loading docks","Property","8166"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Jeff Allen","",1,"studio.operations2@nbcuni.com","","818.733.5263","1.818.777.2296","","4250/1","6AM to 3:30PM","Certified by the City of Los Angeles/Type 1 Fabricator License","Metal Shop","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Mark Jensen","",1,"wood.moulding@nbcuni.com","","818-733-2305","1.818.777.5551","","747 Stage","6AM-5PM","Doors / Window Sashes / Props / Cabinets / Hand Rail / Easements / Custom Milling","Moulding Shop","747 Stage"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Tom Edgington","",1,"universal.signshop@nbcuni.com","","818.866.0209","1.818.777.2350","","4250-2","6AM-5PM or as required","Large Format printing / vinyl graphics / CNC Routing / Dimensional Letting / Faux Plaques / Hand Lettering / Floor Graphics / Custom Wall Paper / Vehicle Graphics / Prop Packaging / Standees/Mounting & Lamination/Digital and Vinyl Banner","Graphic Design & Sign Shops","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Poppy Cannon-Reese","",1,"universal.costume@nbcuni.com","","818.866.1544","1.818.777.2722","","8166/4","7AM to 6 PM","Rentable clothing and costumes / office space / cage space / walkabout costumes / armor and specialty costumes / womens and mens tailoring and dressmaking","Costume","8166"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"","",1,"universal.officeservices@nbcuni.com","","","1.818.777.4964","","3269","24 Hours","Range from 1,883 sq ft to 1,974 sq ft / some include offices / all include closets / sink countertops","Rehearsal Halls","3269"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Carl Rock","",1,"universal.grip@nbcuni.com","","818.866.0105","1.818.777.2478","1.818.777.2291","4250/1","7AM to 5:30PM","Full Inventory / Custom Made Equipment / Competitve Rates","Grip Department","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Beverly Hadley","",1,"universal.property@nbcuni.com","","818.866.1543","1.818.777.2784","","8166/1","6AM to 5PM","Air holding tanks / Bubble Machines / Dump Tanks / Fire Effects / Foggers / Pressure Pots / Rain Towers / Smokers / Snow Machines / Trips / Turntables / Water Tanks / Wave Machines / Winches / Wind Machines","Special Effects Rental Equipment","8166"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Doug Miller","",1,"staff.shop@nbcuni.com","","818.866.0128","1.818.777.2337","","4250/1","6AM to 5PM","Vac-u-form including rock, brick, stone, custom / mold making - fiberglass, plaster, silicone / flex moldings / casting building ornaments- rosettes, cornice, brackets, columns / door and lock hardware / fiberglass casting / Construction Concrete / Set Plastering / Sculpting Services / Foam and Urethanes","Staff Shop","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Carl Rock","Paul Krieg",1,"universal.grip@nbcuni.com","","818.866.1363","1.818.777.1126","","3156","6AM to 2:30PM or as production requires","Large selection including columns, fireplace mantles / miniatures / archways / tombstones / subway car / door units / walls / wrought iron / egyptian items / statues / heaters / gas chamber","Stock Units","3156"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Rick Finney","",1,"universal.transportation@nbcuni.com","","818.866.1521","1.818.777.2966","","8166/1","5AM to 9PM or as production requires","Stakebed & Van Body Trucks / 10 Ton Trucks / Camera Trucks / Forklifts / SUV's / Vans / Production Vans / Semi Tractors & Trailers","Transportation","8166"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Christy Lane","",1,"universal.officeservices@nbcuni.com","","818.866.0293","1.818.777.4964","","4250/3","9AM-6PM  / Ofcs available 24 hrs","Ranges from 550 sq ft - 11,500 sq ft / Wireless Internet / Furnished with no additional fees / on-site parking / mail run / conference rooms","Production Ofc Services","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Christy Lane","",1,"christy.lane@nbcuni.com","","","1.818.777.4964","","","9AM-6PM / Offices available 24 hours","Feature sitting area / bathroom with shower / Closet / Wireless Internet / Available 24 Hours","Dressing Rooms",""]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Phil Alvarado","",1,"phil.alvarado@nbcuni.com","","818.866.1448","1.818.777.2165","","4250/MZ","6AM-2:30PM","Set Construction /  Striking Sets /  Cleaning-Up Backlot Locations /  Furniture Delivery","Labor 724","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Cliff Dexter","",1,"cliff.dexter@nbcuni.com","","","1.818.777.1671","","3156","","Clean after all Production companies on stage and back-lot  as well as I.A.S.T.E. unions except propmakers (local 44). Assist Special Events, Editorial, Sound, Wardrobe, Archives, Feature assets, Property Dept.’s as needed ","Labor 80 - Craft Services","3156"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Stacy Freyre","",1,"stacy.freyre@nbcuni.com","","818.866.0105","1.818.777.2298","","4250/1","5AM to 8:30PM","Provides all temporary power for production needs in addition to maintenance of set lighting equipment","40 Shop","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Bud Steele","",1,"bud.steele@nbcuni.com","","","1.818.777.3430","","4250/1","8AM to 6PM","","Tool Room","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Jeanne Cordova","Krista Boling",1,"jeanne.cordova@nbcuni.com","krista.boling@nbcuni.com","818.866.0293","1.818.777.6085","1.818.777.4696","4250-3","","Represents Studio Operations and facilitates all marketing and PR efforts","Publicity And Marketing","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Mark Danon","",1,"mark.danon@nbcuni.com","","818.866.0128","1.818.777.3261","1.818.777.6955","4250/1","24 Hours","Facilitates the recycling and/or disposal of all local, state, and federally regulated wastes ","Hazardous Materials","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Liz Nassour","",1,"liz.nassour@nbcuni.com","","818.866.0331","1.818.777.6660","","4250/3","9AM to 6PM","Production facility rental agreements for films, series, music videos, commercials, still shoots, UVS-1, Non-Production Short Form Letter Agreement, Picture Editorial Facilities & Services Agreement, Production office lease, Nitrate Element Restoration Services Agreement, Review/Approve Insurance Certificate","Business Affairs","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Post Production Media Services","",7,"universal.post@nbcuni.com","","","1.818.777.0169","","2315","8AM to 6PM","Sound / BluWave Audio / AV / Picture Editoria / Theater Rentals & Projection","Post Production Media Services","2315"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Richard LeGrand","",7,"richard.legrand@nbcuni.com","universal.post@nbcuni.com","","1.818.777.3640","","1220/LL","8:30AM to 5:30PM","18,000 sq ft Facility / Audio Restoration & Preservation / Digital Sound Transfer / Digital Mastering","Bluwave Audio","1220"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Julie Landholt","",7,"julie.landholt@nbcuni.com","","818.866.4611","1.818.777.1331","","2315/1","9AM-5PM Hrs extends as needed","2K Projection / All HD Formats / Playback from DPX, QuickTime and most file formats / Digital Cinema / 3D / Secure encrypted delivery / HD Digital and SD Video Projection / Side by Side Film Projection / All format QC","Screening & Projection","2315"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Post Production Media Services","",7,"universal.post@nbcuni.com","","","1.818.777.0169","","2315","8AM to 5PM","Digital Video or Tape Picture Playback / Records to Pro Tools / DAT Backup / Instant fill-sampling / Large vintage microphone assortment / 100% digital signal path / ISDN / Pro Tools on Stage / Soundmaster Motion Control / Wireless Internet / Complete Client Services","ADR","2315"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Peter Grives","",7,"peter.grives@nbcuni.com","universal.post@nbcuni.com","818.866.4113","1.818.777.3631","","1220/LL","8:30AM to 6:30PM","Windows Media Streaming / Create Dolby Digital and DTS streams for Blu-ray and standard definition DVD / Digital Delivery / High Def Laybacks / Standard Def Laybacks / Dolby E Laybacks / Conforming / 5.1 Upmixing / Foreign Mixing / Mixing-Sweetening / DTS HD","Digital Mastering","1220"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1," Larry Ellena","",7,"universal.post@nbcuni.com","","818.866.5093","1.818.777.5105","","1220/LL","9AM to 6PM","*Emmy Award®-winning talent *Five state-of-the-art mixing studios with Harrison MPC4-D and ICON D-Command consoles *Remote review and playback *Exceptional client services","Television Mixing","1220"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Dave Grove","",7,"dave.grove@efilm.com","","","1.323.856.3116","","2313","8AM to 5PM","Real-time access to all scans and media over private dedicated fiber / interchangeable film and 2D-3D digital projection / Interactive sessions with EFILM's Hollywood and New York Locations","Efilm And Company 3 Di Suite","2313"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Scot Deer","",7,"universal.post@nbcuni.com","","818.866.5093","1.818.777.2470","1.818.749.4862","1220/LL","7AM-5PM nighttime drop-offs, dailies,...","*Night time drop-offs, dailies, etc. *Video playback - HDCAM SR/D5/Digital *Beta cam *Conform to picture/speed changes *Pro Tools® recording/editing *DVD/CD/magneto-optical *35 mm & 16mm mag/dailies *Sony/Studer/Tascam DA-98HR/Akai/Fostex file conversion","Sound Transfer","1220"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Scott Hecker","Michael Bertram",7,"universal.post@nbcuni.com","","818.866.1619","1.818.777.3636","","2313/1","7AM to 6PM","Sound editorial, design, mixing, picture editorial & Avid rentals, EFILM¨ & Company 3¨DI suite, Remote review/playback, ADR, Foley, Digital mastering, Audio preserve & restoration, Archival service, Sound transfer, QC, Screening and projection, Engineering / tech support, Digital infrastructure, Sohonet, SAN.","Sound Editorial","2313"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Doc Goldstein","Jeff Taylor",7,"universal.post@nbcuni.com","","818.866.2825","1.818.777.3180","","2315/1","9AM to 6PM","Outstanding engineering and mix tech support including sound, picture editorial and IT","Post Production Engineering","2315"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Steve Williams","",7,"universal.post@nbcuni.com","","818.866.1494","1.818.777.0169","","2315/1","7AM to 6PM","Sound editorial and mixing services","Theatrical Trailers & TV Spots","2315"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"John Willison","",7,"universal.post@nbcuni.com","","818.866.0763","1.818.777.1695","","2313","9AM to 6PM","*5000 categories of high-quality footage *New materials are cataloged from the latest Universal films as well as our huge library of classic films and television source footage on 35mm color negative *All video formats supplied","Stock Footage Library","2313"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Keith Alexander","",7,"universal.post@nbcuni.com","","","1.818.777.4728","","2282","8AM to 6PM","Over 170 editorial rooms / full Avid Digital Editing System / Office accommodations for Producers and Directors available close-by / Extensive list of additional equipment","Picture Editorial & Avid Rentals","2282"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"","",7,"universal.post@nbcuni.com","","","1.818.777.0169","","2315","8AM to 5PM","Global review of project mix session in realtime at individual production offices *Flexible solution to meet production needs *ISDN *Source-Connect *Dark fiber *Streaming *Audio-video communications","Remote Review / Playback","2315"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Eric Lamb","Scot Deer",7,"universal.post@nbcuni.com","","818.866.2922","1.818.777.9033","","1220/LL","9AM-6PM","Digitization of elements at sample rates up to 96k / removal or reduction of crackle, pops, bumps and other anomalies / Broadband Noise Reduction / Sample Rate Conversion, pitch correction and vari-speeding if necessary / Editorial to conform to picture / Multi-channel (5.1 / 7.1) upmixing","Audio Restoration, Music Replace & Archive","1220"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Ed Carri","",7,"edward.carri@nbcuni.com","","818.866.1438","1.818.777.6792","","4250/MZ","7AM to 6PM","Cable TV Service / Conference Rooms / CD / DVD Cloning / Support for Live Events","Audio / Video Technology","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Steve Williams","",7,"steve.d.williams@nbcuni.com","","818.866.1494","1.818.777.0169","","2315/1","9AM to 6PM","Sound editorial, design, mixing, picture editorial & Avid rentals, EFILM¨ & Company 3¨DI suite, Remote review/playback, ADR, Foley, Digital mastering, Audio preserve & restoration, Archival service, Sound transfer, QC, Screening and projection, Engineering / tech support, Digital infrastructure, Sohonet, SAN","Universal Studios Sound","2315"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Ron Silveira","",7,"ron.silveira@nbcuni.com","","818.866.5258","1.818.777.1816","","3153","9AM to 6PM M-F","*4K, 2K, HD, and SD film transfers *Scanning *Tape to tape/server based color correction *Pan and scan *Editing *Digital effects compositing *Paintbox *Graphics *Dirt concealment *Restoration *Video duplication *Conversions *Video encoding & related services *DCP and KDM creation and management","Digital Services","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Keith Alexander","",7,"keith.alexander@nbcuni.com","","818.733.4290","1.818.777.4728","","2282/154A","9AM to 6PM","*Avid editing systems (Nitris DX, Mojo DX and Symphony) *170 editorial rooms and suites *Final Cut Pro *Pro Tools® *HD equipment *Unity and ISIS storage solutions *Exceptional 24-hour technical support *Worldwide delivery and service","Editorial Facilities","2282"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"John Kersten","",3,"john.kersten@nbcuni.com","","818.866.1452","1.818.777.3430","1.818.777.2334","4250/2","6AM to 5PM","Lot Maintainence","Lot Maintenance","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Studio Grill Restaurant","",3,"bill.christie@nbcuni.com ","scott.ackerman@nbcuni.com","818.866.1560","1.818.777.5432","","2311/LL","7:30AM to 5:30PM ","Universal Studios offers a variety of on lot dining services. The Cafe provides breakfast and lunch, Room Service delivers to offices and productions, The Grill is a more formal restaurant and Catering is available for productions or events","Dining Facilities/Catering","2311"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Ron Cromar","",3,"ron.cromar@nbcuni.com","","818.866.1452","1.818.777.5828","","4250/2","8AM to 5PM","Heating & Air Conditioning Maintainence","Heating & Air Conditioning Maintenance","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Bob Cavaglieri","",3,"bob.cavaglieri@nbcuni.com","","818.866.1566","1.818.777.7912","","3384/2","8AM to 6PM","Emergency Services","Emergency Services","3384"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Sara Mendicino-Beck","",3,"sara.mendicino-beck@nbcuni.com","","818.866.1440","1.818.777.1530","","2282","8AM to 6PM","Mail Room","Mailroom","2282"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Delia Marquez","",3,"document.source@nbcuni.com","","","1.818.777.1288","","2282 / Golf Cart Alley","7:30AM to 7PM","Document Source at John Ford Building","The Document Source","2282"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Sandro Pellegrini","",3,"sandro.pellegrini@nbcuni.com","","818.866.0293","1.818.777.7045","","1320B/1","9AM to 6PM","Telecommunications","Telecommunications","1320"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Christi Berry","",3,"Christi.berry@nbcuni.com","","818.866.0324","1.818.777.2400","","4250/2","6AM to 6PM","On-lot care include initial evaluation & treatment of illness/injury, both personal/work-related, over-the-counter and prescription medications (including antibiotics) dispensed on-site, Blood work*, Ear Irrigations, Allergy Shots*, Wound Care, Suture Removal, Wraps, splints, and crutches","Hospital/Medical Services (Studio)","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Jan McMillan","",3,"jan.mcmillan@nbcuni.com","","818.866.4548","1.818.777.4800","","2160/1","8AM to 6PM","Parking","Parking","2160"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Gil Monge","",3,"","","818.866.1550","1.818.777.2357","","1320A/4","7AM to 2AM","Janitorial works","Janitorial","1320"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"","",3,"","","818.866.2147","1.818.777.4210","","2282/1","7AM to 5PM","The Corner Store offers NBC Universal products including DVDs, toys, clothing and music. Magazines, snacks, lotto tickets and other personal items are also available","Universal Studios Corner Store","2282"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"On Duty Captain","",3,"","","818.866.7510","1.818.777.2422","","3384/1","24*7","L.A. County Fire and Paramedic Services","L.A. County Fire & Paramedic Services","3384"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Watch Commander","",3,"security2@nbcuni.com","","","1.818.777.4496","","2160/1","24*7","Studio Security at Carl Laemmle Building","Security / Studio","2160"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"","",3,"","","","1.818.777.5444","","Golf Cart Alley","","Shoe Shine at  Verna Fields Building (Post Production)","Shoe Shine","Golf Cart Alley"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Bruce Gaims","",3,"","","","1.818.777.4210","","2160","","Fitness Center prides itself on the quality and operation of all of its cardiovascular and weight resistance equipment which are of top brands. You can push iron in the free weight zone or do your flexibility, abdominal, and calisthenic work in the stretch floor area. There’s even a climbing wall for the thrill-seeker in you","Fitness Center","2160"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Irene Rodriguez","",3,"Irene.rodriguez@nbcuni.com","","","1.818.777.2400","","2311"," 6AM-2:30PM","Whether your meeting is in a rehearsal hall, office or sound stage our food & beverage services are available. Choose from our list of pre-set menus or simply call for pricing on a custom menu for your group. Contact us regarding our meeting facility in the back half of the Universal Cafe; available for groups of 15-80","Room Service","2311"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"","",4,"universal.specialevents@nbcuni.com","","","1.818.777.9466","","4250","","Universal’s Studio Special Events Department provides an array of event locations and services creating an exciting and unique environment for any occasion ","Studio Special Events","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Krista Boling","",3,"krista.boling@nbcuni.com","","818.866.0293","1.818.777.4696","","4250/3","8:30AM-5:30PM","Address client concerns, questions and feedback","Studio Customer Relations","4250"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","","2/4K,HD/SD film transfers, Color correction, Pan&scan, Editing, Compositing, Dirt concealment, Restoration, Encoding, Duplication, Conversions, DCP & KDM creation","Universal Digital Services","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","2K,HD,SD film-to-tape transfers, data scanning via Spirit Datacine. 16/35mm daily transfers, negative, interpositives, prints, rough cut, full film-mastering services","Color Correction","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","Autodesk “Smoke” & “Inferno”,Final Cut Pro non-linear edit. Avid DS Nitris & Symphony Nitris for on-line edit. HD/SD linear tape edit via Axial edit controller, Snell HD/SD switchers with DVE. Time Tailor HD/SD vari-speed linear edit","On-Line Editing","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","A full range of editing rooms and equipment is available through Universal Studios Editorial Facilities","Off-Line Editing","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","2/4K,HD/SD, digital/visual effects using Autodesk Inferno. GenArts Sapphire, SpeedSix Monsters, Foundry Furnace available to enhance project’s visual effects","Digital Effects","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","Dirt/dust removal, scratch & wire removal, scene touch-up, tear repair, grain reduction/enhancement, color balancing, image stabilization using MTI Film CORRECT","Dirt / Scratch Removal","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","All format HD/SD duplication, standards/up/down conversion, aspect ratio & cross conversion offered using the Panasonic UFC, Teranex, Alchemist Ph.C converter","Video Duplication & Conversion","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","HD/SD encoding using Snell & Wilcox, Anystream, Digital Rapids.DCP & KDM creation/management. Transcoding using Anystream, Rhozet or Digital Rapids","Encoding","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","Secure encrypted delivery anywhere in the world via SmartJog, Signiant, DigiDelivery, and FTP. Dailies streaming with resolution & Avid bitrate files streaming","Digital File Delivery","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","2K Christie Projector, 2K Film Scanning, Autodesk Lustre Color Corrector, 35mm Film Projection, 10x24 ft screen, Dolby 5.1 Audio, DCP, KDM creation & management","Digital Theater","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","2K,HD/SD film-to-tape transfers/ scanning via Spirit Datacine or CReality telecine.Tape-to-tape or tapeless color correction, pan & scan capabilities with Da Vinci 2K Plus ","Film Scanning","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"Digital Services","",6,"","","","1.818.777.1111","","3153","8AM-5PM","HD & SD Quality Control with operator (any format)","Quality Control","3153"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[1,"","",7,"","","","1.818.777.2250","","","6:30AM-11PM","","Foley",""]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[2,"Production Services","",8,"marybeth.scalici@nbcuni.com","","","1.212.664.4093","","30 Rock","24 Hours","All makeup special effects for film and TV from straight prosthetics to mechanical, mold making and life casting","Makeup And Prosthetics","30 Rock"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[2,"Production Services","",8,"marybeth.scalici@nbcuni.com","","","1.212.664.2013","","30 Rock","24 Hours","Hand Props and special orders","Property","30 Rock"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[2,"Production Services","",8,"marybeth.scalici@nbcuni.com","","","1.212.664.2013","","30 Rock","24 Hours","Manufacturing and altering of Costumes","Costume","30 Rock"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[2,"Production Services","",8,"marybeth.scalici@nbcuni.com","","","1.212.664.2013","","30 Rock","24 Hours","9 sound stages from 4,060 sq ft - 10,000 sq ft","Stages","30 Rock"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[2,"David Steel","",9,"david.steel@nbcuni.com","","","1.212.664.5972","","30 Rock","24 Hours","Offers Broadcast Design/ Digital Packaging/ Main and End Title Design and Animation/ Print, Web and Digital Media Design/ 3D Animation/ Virtual Set Design/ Custom Packages","Artworks","30 Rock"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[2,"Tessa Capodice","",9,"tess.capodice@nbcuni.com","","","1.212.664.2186","","30 Rock","24 Hours","Variety of Editing Rooms equipped with Avids, ProTools, Adrenalines","Editorial Facilities","30 Rock"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[2,"Amy Monheit","",10,"amy.monheit@nbcuni.com","","","1.212.664.2022","","30 Rock","24 Hours","9 sound stages from 1,000 - 6,000 sq ft, property and decor, set lighting, audio video","Special Events","30 Rock"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[3,"Production Services","",11,"trisha.hockings@nbcuni.com","","","1.312.836.5800","","454 N. Columbus Drive","24 Hours","Any and all paint applications / techniques for production","Paint Shop","454 N. Columbus Drive"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[3,"Production Services","",11,"trisha.hockings@nbcuni.com","","","1.312.836.5800","","454 N. Columbus Drive","24 Hours","Production Office Services","Production Office Services","454 N. Columbus Drive"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[3,"Production Services","",11,"trisha.hockings@nbcuni.com","","","1.312.836.5800","","454 N. Columbus Drive","24 Hours","Set Design & Carpentry","Set Design & Carpentry","454 N. Columbus Drive"]);
transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name,bldg_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[3,"Production Services","",11,"trisha.hockings@nbcuni.com","","","1.312.836.5800","","454 N. Columbus Drive","24 Hours","2 sound stages ideal for still shoot, TV and commecial clients- including one at 4,087 sq ft and one at 10,234 sq ft","Stages","454 N. Columbus Drive"]);

//Film Set group
transaction.executeSql('INSERT INTO film_set_group(film_set_group_code,film_set_group_name) VALUES (?,?)', ["B1","Backlot"]);
transaction.executeSql('INSERT INTO film_set_group(film_set_group_code,film_set_group_name) VALUES (?,?)', ["S1","Stage"]);

//Film Set

transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"UVS1","Universal Virtual Stage 1",2,"",3200,"80","40","24","No","","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG1","Stage 1",2,"",9384,"92-6","102-7","","No","Yes","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG3","Stage 3",2,"",12320,"154","80","27-2","Yes","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG4","Stage 4",2,"",10626,"154","69","27-10","Yes","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG5","Stage 5",2,"",8896,"139","64","23-4","No","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG6","Stage 6",2,"",8757,"139","63","19-10","Yes","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG12","Stage 12",2,"",29054,"199","146","49-2","Yes","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG16","Stage 16",2,"",11520,"144","80","28-8","Yes","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG17","Stage 17",2,"",10080,"144","70","28-10","Yes","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG18","Stage 18",2,"",10656,"144","74","29-1","Yes","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG19","Stage 19",2,"",10656,"144","74","27-1","No","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG20","Stage 20",2,"",10656,"144","74","27-1","No","No","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG22","Stage 22",2,"",11618,"157","74","27-0","Yes","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG23","Stage 23",2,"",11932,"157","76","28-1","Yes","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG24","Stage 24",2,"",17584,"157","112","33-4","No","No","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG25","Stage 25",2,"",17584,"157","112","33-4","No","No","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG27","Stage 27",2,"",19701,"199","99","39-10","Yes","No","Yes","4000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG28","Stage 28",2,"",13916,"142","98","43-11","Yes","No","Yes","2700"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG29","Stage 29",2,"",13677,"141","97","27-0","Yes","Yes","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG31","Stage 31",2,"",13677,"141","97","27-0","Yes","Yes","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG33","Stage 33",2,"",6831,"99","69","25-0","No","No","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG34","Stage 34",2,"",6831,"99","69","25-0","No","No","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG35","Stage 35",2,"",6831,"99","69","25-0","No","No","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG37","Stage 37",2,"",14000,"140","100","30-0","Yes","Yes","Yes","7000"]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG41","Stage 41",2,"",14280,"140","102","30-1","No","Yes","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG42","Stage 42",2,"",14280,"140","102","30-0","No","Yes","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG43","Stage 43",2,"",14280,"140","102","30-3","No","Yes","Yes",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"STG44","Stage 44",2,"",14280,"140","102","30-0","Yes","Yes","Yes","7000"]);

                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT1","Mediterranean Square",1,"European/Spartacus","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT2","Court of Miracles",1,"European/Spartacus","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT3","Spartucus Square",1,"European/Spartacus","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT4","European Street",1,"European/Spartacus","","","","","","","",""]);
                   
                   
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT5","Courthouse Square",1,"New York Area","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT6","Wall Street",1,"New York Area","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT7","West Village",1,"New York Area","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT8","Modern New York Street",1,"New York Area","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT9","London Square",1,"New York Area","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT10","Brownstone Street",1,"New York Area","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT11","New York Street",1,"New York Area","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT12","Modern New York Street",1,"New York Area","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT13","Theaters",1,"New York Area","","","","","","","",""]);
                   
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT14","Mexican Street",1,"Old West","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT15","Denver Street",1,"Old West","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT16","Western Street",1,"Old West","","","","","","","",""]);
                   
                   
                   
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT17","Psycho Flats",1,"Parks, Lakes,Woods","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT18","Park Lake",1,"Parks, Lakes,Woods","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT19","Jaws Lake/Cabot Cove",1,"Parks, Lakes, Woods","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT20","Central Park",1,"Parks, Lakes,Woods","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT21","Freeway Park",1,"Parks, Lakes,Woods","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT22","Hollywood Terrace",1,"Parks, Lakes,Woods","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT23","New Falls",1,"Parks, Lakes, Woods","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT24","Woods",1,"Parks, Lakes,Woods","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT25","Falls Lake",1,"Parks, Lakes,Woods","","","","","","","",""]);
                   
                   
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT26","New York Street",1,"Practical","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT27","Studio Restaurant",1,"Practical","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT28","Offices",1,"Practical","","","","","","","",""]);
                   
                   
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT29","Jaws Lake/Cabot Cove",1,"Residential","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT30","West Village",1,"Residential","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT31","Brownstone Street",1,"Residential","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT32","Cabin",1,"Residential","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT33","Chicken Ranch",1,"Residential","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT34","Colonial Street",1,"Residential","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT35","Elm Street",1,"Residential","","","","","","","",""]);
                   
                   
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT36","Jaws Lake/Cabot C",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT37","Commissary",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT38","747 Crash Site",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT39","Bates Motel",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT40","Bridge",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT41","Hollywood Terrace",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT42","Psycho House",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT43","Theaters",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT44","Underwater Tank",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT45","Train Station",1,"Speciality","","","","","","","",""]);
                   transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [1,"BCKLOT46","Rooftops",1,"Speciality","","","","","","","",""]);
                   
                   
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [2,"NYSTG1","Global Media Insert Studios",2,"",,"","","","","","",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [2,"NYSTG3B","Stage 3B",2,"",,"","","","","","",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [2,"NYSTG3K","Stage 3K",2,"",,"","","","","","",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [2,"NYSTG6A","Stage 6A",2,"",,"","","","","","",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [2,"NYSTG6B","Stage 6B",2,"",,"","","","","","",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [2,"NYSTG8G","Stage 8G",2,"",,"","","","","","",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [2,"NYSTG8H","Stage 8H",2,"",,"","","","","","",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [2,"NYSTGEWF","Englewood Facility",2,"",,"","","","","","",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [3,"STDA","Studio A",2,"",,"","","","","","",""]);
transaction.executeSql('INSERT INTO film_set(location_id,film_set_code,film_set_name, film_set_group_id,backlot_category_name,area,length,width,height,pits_tanks,silentac_audience,wireless_internet,pointload) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [3,"STDB","Studio B",2,"",,"","","","","","",""]);

      
      
                   // Maps
                   
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "UVS1"),"","","","Stage","Universal Virtual Stage 1","34.14137900","-118.35573400")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG1"),"","","","Stage","Stage 1","34.14144755","-118.36003570")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG3"),"","","","Stage","Stage 3","34.14165992","-118.35916866")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG4"),"","","","Stage","Stage 4","34.14152681","-118.35917153")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG5"),"","","","Stage","Stage 5","34.14116214","-118.35909414")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG6"),"","","","Stage","Stage 6","34.14097989","-118.35909795")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG12"),"","","","Stage","Stage 12","34.13996154","-118.35874989")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG16"),"","","","Stage","Stage 16","34.14166232","-118.35884163")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG17"),"","","","Stage","Stage 17","34.14153066","-118.35883934")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG18"),"","","","Stage","Stage 18","34.14113135","-118.35900264")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG19"),"","","","Stage","Stage 19","34.14101260","-118.35900514")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG20"),"","","","Stage","Stage 20","34.14080555","-118.35900655")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG22"),"","","","Stage","Stage 22","34.14162400","-118.35807955")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG23"),"","","","Stage","Stage 23","34.14150951","-118.35807677")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG24"),"","","","Stage","Stage 24","34.14108200","-118.35809789")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG25"),"","","","Stage","Stage 25","34.14088546","-118.35809475")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG27"),"","","","Stage","Stage 27","34.14247768","-118.35727128")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG28"),"","","","Stage","Stage 28","34.14157447","-118.35735258")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG29"),"","","","Stage","Stage 29","34.14221400","-118.35721500")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG31"),"","","","Stage","Stage 31","34.141912","-118.356357")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG33"),"","","","Stage","Stage 33","34.14164222","-118.35605842")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG34"),"","","","Stage","Stage 34","34.14152296","-118.35605934")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG35"),"","","","Stage","Stage 35","34.14163810","-118.35583894")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG37"),"","","","Stage","Stage 37","34.14155991","-118.35525337")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG41"),"","","","Stage","Stage 41","34.14214336","-118.35614489")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG42"),"","","","Stage","Stage 42","34.14213487","-118.35579056")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG43"),"","","","Stage","Stage 43","34.14213394","-118.35529569")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "STG44"),"","","","Stage","Stage 44","34.14211584","-118.35495853")');

      
      
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT1"),"","","","Backlot"," Mediterranean Square","34.14074","-118.345993")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT2"),"","","","Backlot"," Court of Miracles","34.14058","-118.345478")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT3"),"","","","Backlot"," Spartucus Square","34.1410964","-118.3448211")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT4"),"","","","Backlot"," European Street","34.14080316","-118.3456002")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT5"),"","","","Backlot"," Courthouse Square","34.14139268","-118.34976593")');
      
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT6"),"","","","Backlot","Wall Street","34.1407400","-118.349941")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT7"),"","","","Backlot"," West Village","34.1407169126508","--118.350838881029")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT8"),"","","","Backlot"," Modern New York Street","34.1410931631","-118.3510556178")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT9"),"","","","Backlot"," London Square","34.1406870520881","-118.350442867834")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT10"),"","","","Backlot"," Brownstone Street","34.1414742714473","-118.350420349204")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT11"),"","","","Backlot"," New York Street","34.1408826576","-118.3512612837")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT14"),"","","","Backlot"," Denver Street","34.13964035","-118.3468404")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT15"),"","","","Backlot"," Mexican Street","34.13920593","-118.3477709")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT16"),"","","","Backlot"," Western Street","34.14000568","-118.3483681")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT17"),"","","","Backlot"," Psycho Flats","34.13626432","-118.34687843")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT18"),"","","","Backlot","Park Lake","34.140892","-118.347275")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT19"),"","","","Backlot","Jaws Lake/Cabot Cove","34.13844236","-118.347458")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT20"),"","","","Backlot","Central Park","34.141468","-118.350627")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT21"),"","","","Backlot"," Freeway Park","34.132996","-118.350413")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT22"),"","","","Backlot"," Hollywood Terrace","34.139088","-118.350027")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT23"),"","","","Backlot"," New Falls","34.13527362","-118.34715400")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT24"),"","","","Backlot"," Woods","34.133689","-118.34743")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT25"),"","","","Backlot","Falls Lake","34.136504","-118.348235")');
      
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT27"),"","","","Backlot"," Studio Restaurant","34.14030558","-118.3601674")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT30"),"","","","Backlot","West Village","34.14071691","-118.35083888")');
      
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT32"),"","","","Backlot"," Cabin","34.13510031","-118.34832222")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT33"),"","","","Backlot"," Chicken Ranch","34.13874211","-118.34648095")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT34"),"","","","Backlot"," Colonial Street","34.13887813","-118.34545192")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT35"),"","","","Backlot"," Elm Street","34.13889096","-118.34697785")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT37"),"","","","Backlot","Commissionary","34.1403055823811","-118.360167378034")');
      
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code="BCKLOT38"),"","","","Backlot"," 747 Crash Site","34.135935","-118.347387")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT39"),"","","","Backlot"," Bates Motel","34.13663773","-118.34663256")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT40"),"","","","Backlot","Bridge","34.13993161","-118.35171626")');
      
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT42"),"","","","Backlot"," Psycho House","34.13626432","-118.34687843")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT44"),"","","","Backlot"," Underwater Tank","34.14045375","-118.34849617")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT45"),"","","","Backlot"," Train Station","34.14081100","-118.34599300")');
      transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ( (select film_set_id from film_set where film_set_code= "BCKLOT46"),"","","","Backlot"," Rooftop","34.14098031","-118.35438350")');
      


//Production Services

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","4250","","Production Services","Backlot Locations, Sound Stages, Set Lighting, Paint Shop, Graphic Design & Sign Shops, Grip Department, Staff Shop, Production Ofc Services, Labor 724, 40 Shop , Tool Room , Publicity and Marketing , Hazardous Materials , Business Affairs,Metal Shop, ","34.14161699","-118.35406638")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","8166","","Production Services","Property,Costume,Special Effects Rental Equipment,Transportation","34.14161501","-118.34577655")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","3156","","Production Services","Stock Units, Labor 80 - Craft Services","34.14256941","-118.35605371")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","","","Production Services","Moulding Shop","34.141965","-118.3564")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","","","Production Services","Dressing Rooms","34.14193","-118.356378")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","3269","","Production Services","Rehearsal Halls","34.14153467","-118.35486072")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2315","","Post Production","Remote Review / Playback,Universal Studios Sound,Post Production Media Services,ADR,Post Production Engineering,Theatrical Trailers & TV Spots","34.14004137","-118.35905633")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1220","","Post Production"," Bluwave Audio, Digital Mastering, Television Mixing, Sound Transfer, Audio Restoration, Music Replace & Archive,Screening & Projection","34.14155171","-118.35406638")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2282","","Post Production"," Picture Editorial & Avid Rentals, Editorial Facilities","34.14078303","-118.35910662")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2313","","Post Production","Efilm and Company 3 DI Suite,Sound Editorial","34.14018865","-118.35958251")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2332","","Post Production", "Projection Theater 1", "34.13976006", "-118.35996622")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2332","","Post Production", "Projection Theater 2", "34.13976047", "-118.35983082")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2332","","Post Production", "Projection Theater 3", "34.13975895", "-118.35970000")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4250","","Working on the lot"," Lot Maintenance, Heating & Air Conditioning Maintenance, Hospital/Medical Services (Studio), Studio Customer Relations","34.14161699","-118.35406638")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2311","","Working on the lot"," Dining Facilities/Catering, Room Service","34.14030558","-118.36016738")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 3384","","Working on the lot"," Emergency Services,L.A. County Fire & Paramedic Services","34.13942891","-118.35667434")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2282","","Working on the lot"," The Document Source, Universal Studios Corner Store,Shoe Shine,Mailroom","34.14078303","-118.35910662")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1320","","Working on the lot"," Telecommunications, Janitorial","34.14020797","-118.36055609")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2160","","Working on the lot"," Parking,Security / Studio(24*7)","34.14205362","-118.35915584")')
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2160","","Working on the lot"," Fitness Center","34.14205840","-118.35919552")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 3153","","Digital Services"," Universal Digital Services , Color Correction, On-Line Editing , Off-Line Editing, Digital Effects,Dirt / Scratch Removal, Video Duplication & Conversion, Encoding, Digital File Delivery, Digital Theater, Film Scanning, Quality Control","34.14252476","-118.35663231")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Barham Parking"),"","","Parking Lots","Barham Parking","34.14290330","-118.34306291")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Visitor Parking"),"","","Parking Lots","Visitor Parking","34.14218720","-118.36029441")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6525","","Parking Lots"," Parking Garages","34.13639196","-118.35018120")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Costume/Prop Parking"),"","","Parking Lots"," Costume/Prop Parking","34.14197777","-118.34524070")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Transportaiton Parking Lot"),"","","Parking Lots"," Transportaiton Parking Lot","34.14175710","-118.34399474")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Child Care Center Parking Lot"),"","","Parking Lots"," Child Care Center Parking Lot","34.14151629","-118.34311590")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Roads"),"","","Parking Lots"," Roads","34.14182847","-118.34827668")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 9116","","Parking Lots","Lakeside Plaza Parking Booth ","34.14364586","-118.34266118")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2160","","Parking Lots","Parking/Pass Office ","34.14205362","-118.35915584")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1460","","Parking Lots","10 UCP Parking ","34.13853803","-118.36113821")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 8140","","Parking Lots","Storage","34.14171247","-118.34625802")');


                   //Office Building
                   
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1139","","Office Buildings","Technicolor Security Office ","34.14274618","-118.36023305")');
                   
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2352","","Office Buildings","Ross Hunter Building ","34.13946277","-118.35995462")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2352","","Office Buildings","Ross Hunter Building (Office Building)"," 34.13964293","-118.35969147")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 3213","","Office Buildings","Office Building-3213 ","34.14219249","-118.35666543")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4111","","Office Buildings","Office Bungalow-4111 ","34.14284112","-118.35439245")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4113","","Office Buildings","Office Bungalow -4113","34.14281421","-118.35410127")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4115","","Office Buildings","Office Bldg C ","34.14275019","-118.35373298")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4118","","Office Buildings","Office Bldg D ","34.14275557","-118.35323326")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4131","","Office Buildings","Office Bungalow-4131 ","34.14272215","-118.35438294")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4132","","Office Buildings","Office Bungalow-4132 ","34.14266259","-118.35419335")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4133","","Office Buildings","Office Bungalow-4133 ","34.14270449","-118.35405926")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4135","","Office Buildings","Office Bungalow-4135 ","34.14263390","-118.35372848")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4136","","Office Buildings","Office Bungalow-4136 ","34.14260299","-118.35353212")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4144","","Office Buildings","Office Bungalow-4144 ","34.14257433","-118.35403117")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4171","","Office Buildings","Office Bungalow -Edith Head Bungalow-4171"," 34.14249273","-118.35453000")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","4172","","Office Buildings", "Office Bungalow -Edith Head Bungalow-4172", "34.14243885", "-118.35435592")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","4173","","Office Buildings", "Office Bungalow-4173", "34.14244927", "-118.35421826")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","5138","","Office Buildings", "Office Bungalow-5138", "34.14218209", "-118.35153488")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","5162","","Office Buildings", "Office Bungalow-5162", "34.14206335", "-118.35299172")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","5163","","Office Buildings", "Office Bungalow-5163", "34.14194569", "-118.35276861")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","5164","","Office Buildings", "Office Bungalow-5164", "34.14193498", "-118.35251381")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","4175","","Office Buildings", "Office Bungalow-4175", "34.14236239", "-118.35407158")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5165","","Office Buildings", "Office Bungalow-5165", "34.14191630", "-118.35237604")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5166","","Office Buildings", "Office Building-5166", "34.14181944", "-118.35221957")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5170","","Office Buildings", "Office Bungalow-5170", "34.14211546", "-118.35344407")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5171","","Office Buildings", "Office Bungalow-5171", "34.14200926", "-118.35321641")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5174","","Office Buildings", "Office Bungalow-5174", "34.14181250", "-118.35263494")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5177","","Office Buildings", "Office Bungalow-5177", "34.14141438", "-118.35173820")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5180","","Office Buildings", "Office Bungalow-5180", "34.14209580", "-118.35363907")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5182","","Office Buildings", "Office Bungalow-5182", "34.14183577", "-118.35316289")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5183","","Office Buildings", "Office Bungalow-5183", "34.14176025", "-118.35288488")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5184","","Office Buildings", "Office Bungalow-5184", "34.14168804", "-118.35278130")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5185","","Office Buildings", "Office Bungalow (Hitchcock Bungalow)", "34.14165614", "-118.35259526")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5186","","Office Buildings", "Office Bungalow-5186", "34.14159746", "-118.35243207")');
                   
                   
                   
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5195","","Office Buildings", "Office Bungalow (Hitchcock Bungalow)", "34.14154855", "-118.35268044")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5196","","Office Buildings", "Office Bungalow-5196", "34.14146355", "-118.35254626")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6120","","Office Buildings", "Office Trailer - Security", "34.14182254", "-118.35091484")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6121","","Office Buildings", "Office Trailer-6121", "34.14186607", "-118.35070847")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6122","","Office Buildings", "Office Trailer-6122", "34.14183333", "-118.35048457")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6124","","Office Buildings", "Office Trailer-6124", "34.14170188", "-118.34974961")');
                   
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6125","","Office Buildings", "Office Trailer-6125", "34.14162930", "-118.34927596")');
                   
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6128","","Office Buildings", "Office Trailer-6128", "34.14152090", "-118.34881937")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6138","","Office Buildings", "Office Trailer-6138", "34.14147080", "-118.34872065")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6139","","Office Buildings", "Office Trailer (backlot)-6139", "34.14141590", "-118.34865329 ")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6147","","Office Buildings", "Office Trailer (backlot)-6147", "34.14129550", "-118.34881616")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6148","","Office Buildings", "Office Trailer (backlot)-6148", "34.14126978", "-118.34863962")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6149","","Office Buildings", "Office Trailer (backlot)-6149", "34.14130702", "-118.34854368")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6157","","Office Buildings", "Office Trailer (backlot)-6157", "34.14116062", "-118.34873183")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6158","","Office Buildings", "Office Trailer (backlot)-6158", "34.14123033", "-118.34871032")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6159","","Office Buildings", "Office Trailer (backlot)-6159", "34.14116691", "-118.34853678")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6167","","Office Buildings", "Office Trailer (backlot)-6167", "34.14099864", "-118.34865427")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6168","","Office Buildings", "Office Trailer (backlot)-6168", "34.14107217", "-118.34863163")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6169","","Office Buildings", "Office Trailer (backlot)-6169", "34.14104568", "-118.34855349")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7135","","Office Buildings", "Office Trailer (Bldg & Safety)", "34.14144385", "-118.34729436")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7141","","Office Buildings", "Office Trailer - Shoah Security", "34.14132506", "-118.34810451")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7142","","Office Buildings", "Office Trailer (24x60 Shoah)-7142", "34.14125510", "-118.34789946")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7143","","Office Buildings", "Office Trailer (24x60 Shoah)-7143", "34.14124046", "-118.34768137")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7144","","Office Buildings", "Office Trailer (24x60 Shoah)-7144", "34.14122396", "-118.34744721")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7151","","Office Buildings", "Office Trailer (24x60 Shoah)-7151", "34.14117239", "-118.34812862")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7152","","Office Buildings", "Office Trailer (24x60 Shoah)-7152", "34.14112544", "-118.34786450")');
                   transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7153","","Office Buildings", "Office Trailer (24x60 Shoah)-7153", "34.14116137", "-118.34764547")');
                   
                   
                   //offie building ends here


transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Country Cabin"),"","","General","Country Cabin","34.13510031","-118.34832222")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Production Lot"),"","","General","Production Lot","34.14244748","-118.35492619")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Transformers"),"","","General ","Transformers","34.14128583","-118.35674867")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Corner Store"),"","","General ","Corner Store","34.14067244","-118.36008814")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Pycho Open Area"),"","","General ","Pycho Open Area","34.13561138","-118.34698130")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Wisteria Lane"),"","","General ","Wisteria Lane","34.13848257","-118.34590399")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Circle Drive"),"","","General","Circle Drive","34.13948449","-118.34483237")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Wisteria Shooting Station"),"","","General","Wisteria Shooting Station","34.13803155","-118.34639194")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Singapore Street"),"","","General","Singapore Street","34.13871923","-118.34780332")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "5 Points"),"","","General ","5 Points","34.13995659","-118.34802075")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Park Lake Pumphouse"),"","","General ","Park Lake Pumphouse","34.14082186","-118.34822804")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Red Sea"),"","","General ","Red Sea","34.14101966","-118.34663096")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Hertz Lot"),"","","General ","Hertz Lot","34.14092104 ","-118.34608549")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Fuel Facility"),"","","General ","Fuel Facility","34.14186766","-118.34453739")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Embassy Street"),"","","General ","Embassy Street","34.14082644","-118.34925866")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Royal Crescent Drive"),"","","General ","Royal Crescent Drive","34.14042049 ","-118.35023807 ")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "Park Avenue"),"","","General ","Embassy Street","34.14136117","-118.35076126")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("",(select directory_id from directory where department_service_name= "New England Street"),"","","General ","New England Street","34.14139129","-118.35106834")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4250","","Special Events","Studio Special Events","34.14161699","-118.35406638")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 3153",""," Digital Services","Universal Digital Services , Color Correction, On-Line Editing , Off-Line Editing, Digital Effects, Dirt/Scratch Removal, Video Duplication & Conversion, Encoding, Digital File Delivery, Digital Theater, Film Scanning, Quality Control","34.14252476","-118.35663231")');


transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2313","","Post Production","Stock Footage Library","34.14018865","-118.35958251")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 4250","","Post Production","Audio / Video Technology","34.14161699","-118.35406638")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 3153","","Post Production","Digital Services","34.14252476","-118.35663231")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2353","","Post Production","Foley","34.13965664","-118.35945171")');


transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1126","","","Technicolor-Plant 20","34.14287118","-118.36037281")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1148","","General"," Technicolor Gate  Guardhouse # 3","34.14260877","-118.36037738")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1208","","General"," North Gate Guardhouse #2","34.14189688","-118.36025612")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1280","","General"," Lew R. Wasserman Building ","34.14069159","-118.36045619")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1306","","General"," Main Gate Guardhouses #1","34.14057489","-118.36052986")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1360","","General"," Jules Stein Building ","34.13964211","-118.36107271")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2250","","General"," Jack Webb Building ","34.14106558","-118.36001315")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2243","","General"," Power House ","34.14130334","-118.35909704")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2252","","General"," William Goetz Building ","34.14109620","-118.35974074")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2333","","General"," Projection Storage ","34.13990282","-118.35944817")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2347","","General"," Sound Repair Shop ","34.13976406","-118.35862139")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2372","","General","Rock Hudson Building ","34.13921009","-118.35973389")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 3384","","General","Fire Station / Emergency Operations ","34.13942891","-118.35667434")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2128","","General","Abbott and Costello Building ","34.14267278","-118.35820218")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 3205","","General","Power House ","34.14233607","-118.35591047")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 3250","","General","Phantom Stage Storage ","34.14166542","-118.35757157")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 3251","","General","Phantom Stage Restrooms / Storage ","34.14166317","-118.35736501")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5146","","General","Mechanical Building ","34.14187052","-118.35171717")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5159","","General","Mechanical & Electrical Shops ","34.14144800","-118.35129311")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5225","","General","Owen Bradley Building ","34.14111684","-118.35234355")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6136","","General","Grip Storage ","34.14138367","-118.34925772")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6137","","General","Trailer Restrooms ","34.14135590","-118.34878689")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6146","","General","Grip Storage ","34.14130567","-118.34925012")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6111","","General","Reitman Bungalow ","34.14221966","-118.35051488")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6178","","General","Plane Mock-up Stage (747 Stage) ","34.14088628","-118.34893058")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6217","","General","Film Vault ","34.14010530","-118.34906837")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6236","","General","Film Vault ","34.13987789","-118.34951150")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6237","","General","Film Vault ","34.13991025","-118.34920870")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6238","","General","Film Vault / Administration ","34.13993432","-118.34880259")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6239","","General","Western Street Restrooms ","34.14004408","-118.34855842")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6248","","General","Film Vault ","34.13986252","-118.34888491")');

transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1126","","General","Technicolor-Plant 20","34.14287118","-118.36037281")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1148","","General ","Technicolor Gate  Guardhouse # 3","34.14260877","-118.36037738")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6261","","General","Greenhouse ","34.13983806","-118.35090897")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6265","","General","Nursery","34.13960825","-118.35020575")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6361","","General","Hollywood Terrace Restrooms 1","34.13883015","-118.35043076")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6333","","General","Prop Plaza Patio ","34.13900722","-118.34990940")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6351","","General","Prop Plaza Main Stand ","34.13883159","-118.35026324")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6353","","General","Prop Plaza Kiosk ","34.13876631","-118.35007134")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6356","","General","Hollywood Terrace Restrooms 2","34.13859377","-118.34968736")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6356","","General","Upstart Crow Patio","34.13863180","-118.34969089")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 6361","","General","Sky Venture ","34.13880523","-118.35042829")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7127","","General","Park Lake Pumphouse ","34.14148077","-118.34704515")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7156","","General","Red Sea Pumphouse ","34.14112873","-118.34704978")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7160","","General","Trailer Restrooms ","34.14106668","-118.34822514")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7212","","General","Western Street Pumphouse ","34.14007023","-118.34773996")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7227","","General","Earthquake","34.14004762","-118.34697392")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7231","","General","Backlot Barn ","34.13968876","-118.34800861")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7234","","General","Denver Street Property Storage ","34.13970931","-118.34733225")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7242","","General","Western Street Storage ","34.13944305","-118.34793085")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 7264","","General","Denver Street Trailer Restrooms ","34.13947805","-118.34720636")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 8214","","General","European St. Restroom ","34.14079892","-118.34538532")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 8216","","General","Prop. Storage","34.14096741","-118.34518635")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 8413","","General","Merchandise Warehouse ","34.13753359","-118.34615721")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 9104","","General","Satellite Dish Control Room","34.14352719","-118.34298258")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 9104","","General","Satellite Dish Control Room","34.14340752","-118.34312266")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 9123","","General","Gate 4 Guardhouse (North)"," 34.14290063","-118.34347758")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 9128","","General","One Lakeside Plaza ","34.14385320","-118.34164036")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 9175","","General","Transportation Guardhouse ","34.14320593","-118.34313331")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 9227","","General","Child Care Center ","34.14152681","-118.34259409")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1440","","General","10 UCP","34.13854030","-118.36137488")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 8151","","General","Golden Monkey Lot ","34.14109300","-118.34601161")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 1139","","General","Technicolor Security Office","34.14274618","-118.36023305")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","5125","","General", "Amblin Office Building", "34.14243592", "-118.35181207")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", "","5121","","General", "Amblin Main Office Building", "34.14240894", "-118.35288417")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 5187","","General", "Repair Garage & Offices", "34.14144228", "-118.35215171")');
transaction.executeSql('INSERT INTO mapslocations(filmset_id ,directory_id , building_number,general_location_cat_name,category_name ,display_name,latitude ,longitude) VALUES ("", ""," 2313","","General", "Alfred Hitchcock Building(Theater)", "34.14045387", "-118.35959283")');

                
                   
                   });
}

/*
 * Initialise the database.
 */
function initDB() {
    try {
        if(!window.openDatabase) {
            alert('Not supported');
        } else {
            // create the database
            var shortName = 'FMD_DB';
            var version = '1.0';
            var displayName = 'FMDDatabase';
            var maxSize = 3*1024*1024;
            myDB = openDatabase(shortName, version, displayName, maxSize);
        }
    } catch (e) {
        // Error handling code goes here.
        if(e == INVALID_STATE_ERR) {
            // Version number mismatch.
            alert("Invalid database version.");
        } else {
            alert("Unknown error " + e + ".");
        }
        return;
    }
    
    createTables();
    //Called only once
    myDB.transaction(function (tx) {
                     tx.executeSql("SELECT * FROM directory" , [], function (tx, result){
                                   dataset = result.rows;
                                   if(!dataset.length>0){
                                   insertRecords();
                                   }
                                   });
                     });
    
}

// Import Contacts - Begin
var phoneContacts=new Array();
var contactCount=0;
function importContact(element){
	var departmentServiceName = element.id;
    var currentLocation=localStorage.getItem("currentLocationId");
    
	myDB.transaction(function(transaction) {
                     transaction.executeSql('select * from directory where department_service_name =? and location_id=?',[departmentServiceName,currentLocation], importContactSuccessHandler, errorHandler);
                     });
}
function importContactSuccessHandler(transaction, results) {
    
	dataset = results.rows;
    
	if(dataset.length>0){
       	item = dataset.item(0);
        
    	var departmentServiceName=item['department_service_name'];
        
		var building = item['bldg_specific_number'];
		var person1 =item['contact_person1'];
		var person2 =item['contact_person2'];
		person2+=" - ";
		var phone1 =item['phone_number1'];
		var phone2 = item['phone_number2'];
		var faxNumber = item['fax'];
		var mail1 = item['email1'];
		var mail2 = item['email2'];
        var locationId=item['location_id'];
        
        var contact = navigator.contacts.create();
        var name = new ContactName();
        name.familyName = person1;
        name.givenName= departmentServiceName;
        contact.name = name;
        
        // store contact phone numbers in ContactField[]
        var phoneNumbers = [];
        
        phoneNumbers[0] = new ContactField();
        phoneNumbers[0].type='work';    //We can have 'work' and 'home' numbers
        phoneNumbers[0].value= phone1;
        phoneNumbers[0].preferred=true;// preferred number
        if(faxNumber.length>0){
            phoneNumbers[1] = new ContactField();
            phoneNumbers[1].type='fax';    //We can have 'work' and 'home' numbers
            phoneNumbers[1].value=faxNumber;
            phoneNumbers[1].preferred=true;
        }
        if(phone2.length>0){
            phoneNumbers[2] = new ContactField();
            phoneNumbers[2].type='other';    //We can have 'work' and 'home' numbers
            phoneNumbers[2].value=phone2;
            phoneNumbers[2].preferred=true;
        }
        contact.phoneNumbers = phoneNumbers;
        
        // store contact phone numbers in ContactField[]
        var emailAddress = [];
        emailAddress[0] = new ContactField();
        emailAddress[0].type='work';    //We can have 'work' and 'home' numbers
        emailAddress[0].value=mail1;
        emailAddress[0].preferred=true;// preferred number
        
        if(mail2.length>0){
            emailAddress[1] = new ContactField();
            emailAddress[1].type='other';    //We can have 'work' and 'home' numbers
            emailAddress[1].value=mail2;
            emailAddress[1].preferred=true;
        }
        contact.emails = emailAddress;
        
        var location=new Array("Universal Studios","New York","Chicago");
        
        var ctAddress=[];
        ctAddress[0]= new ContactAddress();
        if(building.trim().length>0){
            ctAddress[0].streetAddress="Bldg - "+ building+ "," ;
        }
        
        ctAddress[0].country=location[locationId-1] ;
        
        contact.addresses=ctAddress;
        
        contact.save(onSaveSuccess,onSaveError);
        phoneContacts[contactCount]= departmentServiceName;
        contactCount++;
    }
}
// onSaveSuccess: Get a snapshot of the current contacts
function onSaveSuccess(contact) {
    navigator.notification.alert('Contact Saved Successfully!',{},'Import Contact','Done');
    
}

// onSaveError: Failed to get the contacts
function onSaveError(contactError) {
	if(contactError.code==4){
        navigator.notification.alert('Check your Privacy settings',{},'Import Contact','Done');
	}else{
        navigator.notification.alert('Unable to add the contact',{},'Import Contact','Done');
	}
}

function errorHandler(transaction, error) {
	alert('Error was ' + error.message + ' (Code ' + error.code + ')');
}

// Import Contacts - End

//SMS Composer - Start
function composeSMS(element){
    var departmentServiceName = element.id;
    var currentLocation=localStorage.getItem("currentLocationId");
    
	myDB.transaction(function(transaction) {
                     transaction.executeSql('select * from directory where department_service_name =? and location_id=?',[departmentServiceName,currentLocation], composeSMSSuccessHandler, errorHandler);
                     });
    
}
function composeSMSSuccessHandler(transaction, results){
    
	dataset = results.rows;
    
	if(dataset.length>0){
       	item = dataset.item(0);
        
    	var departmentServiceName=item['department_service_name'];
        
		var building = item['bldg_specific_number'];
		var person1 =item['contact_person1'];
		var person2 =item['contact_person2'];
        var workTime = item['work_time'];
		var phone1 =item['phone_number1'];
		var phone2 = item['phone_number2'];
		var faxNumber = item['fax'];
		var mail1 = item['email1'];
		var mail2 = item['email2'];
        var locationId=item['location_id'];
        var desc=item['department_service_name'];
        
        
        var temp="";
        temp+=departmentServiceName;
        if(person1 !==""){
            
            temp+=", Contact: "+person1;
        }
        if(building !==""){
            
            temp+=", Building: "+building;
        }
        if(phone1 !==""){
            
            temp+=", Tel: "+phone1;
        }
        if(phone2 !=="" && phone1 !=""){
            
            temp+=", "+phone2;
        }
        else if(phone2 !=="" && phone1 =="")
        {
            temp+=", Tel: "+phone2;
        }
        if(faxNumber !==""){
            
            temp+=", Fax: "+faxNumber;
        }
        if((workTime!=="")&&(deptServiceName =="Foley")){
            
            temp+=", Timings: "+workTime;
        }
        else if(workTime!==""){
            
            temp+=", Timings: "+workTime;
        }
        if(mail1!==""){
            
            temp+=", Email: "+mail1;
        }
        if(mail2!=="" && mail1!=""){
            
            temp+=", "+mail2;
        }
        else if(mail2!=="" && mail1==""){
            
            temp+=", Email: "+mail2;
        }
        
        
    } //end of if
    window.plugins.smsComposer.showSMSComposer('', temp);
    
}
function errorHandler(transaction, error) {
	alert('Error was ' + error.message + ' (Code ' + error.code + ')');
}

// SMS Composer End

// Directory Services - Begin
var tempSearchResultsString;
var tempUnivStudiosResultsString;
var tempNBCNewYorkResultsString;
var tempNBCChicagoResultsString;
var tempUnivStudiosProductionServices;
var deptServiceName;
var bldgNumber;
var contactPerson1;
var contactPerson2;
var phoneNumber1;
var phoneNumber2;
var fax;
var workTime;
var email1;
var email2;
var description;
var locationName;




// Function to fetch data from database and display based on search, for all three locations
function showSearchDirectoryRecords(searchWord)
{
    tempSearchResultsString="";
    myDB.transaction(function (tx) {
                     tx.executeSql("SELECT department_service_name,bldg_specific_number,contact_person1,contact_person2,phone_number1,phone_number2,fax,work_time,email1,email2,location_name FROM directory,location WHERE directory.location_id=location.location_id AND (contact_person1 LIKE '%"+searchWord+"%' OR contact_person2 LIKE '%"+searchWord+"%' OR department_service_name LIKE '%"+searchWord+"%') ORDER BY department_service_name", [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
								   locationName = item['location_name'];
                                   
                                   tempSearchResultsString+= '<li class="dirCntGrnt" ><div class="lisHdGrnt"><p id="header">'+deptServiceName+'</p></div><section><b class="locationBold">'+locationName+' </b>'
                                   temp+=deptServiceName;
                                   if(contactPerson1 !==""){
                                   tempSearchResultsString+= '<span>'+contactPerson1+'</span><br>'
                                   temp+=", Contact: "+contactPerson1;
                                   }
								   if(contactPerson2 !==""){
                                   tempSearchResultsString+= ' / <span>'+contactPerson2+' </span>'
                                   temp+=" / "+contactPerson2;
                                   }
                                   if(bldgNumber !==""){
                                   tempSearchResultsString+='<span>Building: '+bldgNumber+'<br></span>'
                                   temp+=", Building: "+bldgNumber;
                                   }
                                   if(phoneNumber1 !==""){
                                   tempSearchResultsString+= '<span class="tellFonts">Tel: <a href ="tel: '+phoneNumber1+'">'+phoneNumber1+'</a></span>'
                                   temp+=", Tel: "+phoneNumber1;
                                   }
                                   if(phoneNumber2 !==""){
                                   tempSearchResultsString+= '<span class="tellFonts"> / <a href ="tel: '+phoneNumber2+'">'+phoneNumber2+'</a></span><br>'
                                   temp+=", "+phoneNumber2;
                                   }
                                   
                                   if(fax !==""){
                                   tempSearchResultsString+= ' <span class="tellFonts">Fax: <a>'+fax+'</a></span>'
                                   temp+=", Fax: "+fax;
                                   }
                                   if((workTime!=="")&&(deptServiceName =="Foley")){
                                   tempSearchResultsString+= '<span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   else if(workTime!==""){
                                   tempSearchResultsString+= '<br><span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   
                                   if(email1!==""){
                                   tempSearchResultsString+= '<br><span>Email: </span><span class="dirMailStyle"><a href ="mailto: '+email1+'">'+email1+'</a></span>'
                                   temp+=", Email: "+email1;
                                   }
                                   if(email2!==""){
                                   tempSearchResultsString+= ' / <span class="dirMailStyle"><a href ="mailto: '+email2+'">'+email2+'</a></span>'
                                   temp+=", Email: "+email2;
                                   }
                                   
                                   // tempSearchResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" onclick="composeSMS(this);"><a ></a></span><span id="'+deptServiceName+'" class="addBtn" onclick="importContact(this)"><a ></a></span></li><li class="listgap"></li>'
                                   if (platform.iphone) {
                                   tempSearchResultsString+='</section><span class="smsBtn"><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempSearchResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   if(i!==(dataset.length-1))
                                   tempSearchResultsString+='<li class="listgap"></li> '
                                   
                                   }
                                   
                                   }
                                   else
                                   tempSearchResultsString=' No records match your search criteria.'
                                   document.getElementById("loadSearchResults").innerHTML= tempSearchResultsString;
                                   });
                     });
};


//Function to fetch Universal Studios Directory data
function showUniversalStudiosDirectoryRecords(){
    tempUnivStudiosResultsString="";
    myDB.transaction(function (tx) {
                     tx.executeSql('SELECT * FROM directory,location WHERE location.location_id=1 AND location.location_id=directory.location_id ORDER BY department_service_name', [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
                                   
                                   tempUnivStudiosResultsString+= '<li class="dirCntGrnt" ><div class="lisHdGrnt"><p id="header">'+deptServiceName+'</p></div><section>'
                                   temp+=deptServiceName;
                                   
                                   if(contactPerson1 !==""){
                                   tempUnivStudiosResultsString+= '<span>'+contactPerson1
                                   temp+=", Contact: "+contactPerson1;
                                   }
                                   if(contactPerson2 !==""){
                                   tempUnivStudiosResultsString+= ' / '+contactPerson2
                                   temp+=" / "+contactPerson2;
                                   
                                   }
                                   if((contactPerson1 !=="")||(contactPerson2 !=="")){
                                   tempUnivStudiosResultsString+= '</span><br>'
                                   }
                                   if(bldgNumber !==""){
                                   tempUnivStudiosResultsString+='<span>Building: '+bldgNumber+'<br></span>'
                                   temp+=", Building: "+bldgNumber;
                                   }
                                   if(phoneNumber1 !==""){
                                   tempUnivStudiosResultsString+= '<span class="tellFonts">Tel: <a class = "phoneNumberStyle" href ="tel: '+phoneNumber1+'">'+phoneNumber1+'</a></span>'
                                   temp+=", Tel: "+phoneNumber1;
                                   }
                                   if(phoneNumber2 !==""){
                                   tempUnivStudiosResultsString+= '<span class="tellFonts"> / <a class = "phoneNumberStyle" href ="tel: '+phoneNumber2+'">'+phoneNumber2+'</a></span><br>'
                                   temp+=", "+phoneNumber2;
                                   }
                                   
                                   if(fax !==""){
                                   tempUnivStudiosResultsString+= ' <span class="tellFonts">Fax: <a>'+fax+'</a></span>'
                                   temp+=", Fax: "+fax;
                                   }
                                   if((workTime!=="")&&(deptServiceName =="Foley")){
                                   tempUnivStudiosResultsString+= '<span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   else if(workTime!==""){
                                   tempUnivStudiosResultsString+= '<br><span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   if(email1!==""){
                                   
                                   tempUnivStudiosResultsString+= '<br><span>Email: </span><span class="dirMailStyle" ><a class = "phoneNumberStyle" href ="mailto: '+email1+'">'+email1+'</a></span>'
                                   temp+=", Email: "+email1;
                                   }
                                   if(email2!==""){
                                   tempUnivStudiosResultsString+= ' / <span class="dirMailStyle"><a class = "phoneNumberStyle" href ="mailto: '+email2+'">'+email2+'</a></span>'
                                   temp+=", Email: "+email2;
                                   }
                                   if (platform.iphone) {
                                   tempUnivStudiosResultsString+='</section><span class="smsBtn"><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempUnivStudiosResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   if(i!==(dataset.length-1))
                                   tempUnivStudiosResultsString+='<li class="listgap"></li> '
                                   
                                   }
                                   }
                                   else
                                   tempUnivStudiosResultsString='This directory does not contain any contacts currently'
                                   document.getElementById("loadUnivStudiosResults").innerHTML= tempUnivStudiosResultsString;});
                     });
    
}

//Function to fetch NBC Chicago Directory data

function showNBCChicagoDirectoryRecords(){
    tempNBCChicagoResultsString="";
    myDB.transaction(function (tx) {
                     tx.executeSql('SELECT * FROM directory,location WHERE location.location_id=3 AND location.location_id=directory.location_id ORDER BY department_service_name', [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
                                   
                                   tempNBCChicagoResultsString+= '<li class="dirCntGrnt" ><div class="lisHdGrnt"><p id="header">'+deptServiceName+'</p></div><section>'
                                   temp+=deptServiceName;
                                   if(contactPerson1 !==""){
                                   tempNBCChicagoResultsString+= '<span>'+contactPerson1
                                   temp+=", Contact: "+contactPerson1;
                                   }
                                   if(contactPerson2 !==""){
                                   tempNBCChicagoResultsString+= ' / '+contactPerson2
                                   temp+=" / "+contactPerson2;
                                   
                                   }
                                   if((contactPerson1 !=="")||(contactPerson2 !=="")){
                                   tempNBCChicagoResultsString+= '</span><br>'
                                   }
                                   if(bldgNumber !==""){
                                   tempNBCChicagoResultsString+='<span>Building: '+bldgNumber+'<br></span>'
                                   temp+=", Building: "+bldgNumber;
                                   
                                   }
                                   if(phoneNumber1 !==""){
                                   tempNBCChicagoResultsString+= '<span class="tellFonts">Tel: <a class = "phoneNumberStyle" href ="tel: '+phoneNumber1+'">'+phoneNumber1+'</a></span>'
                                   temp+=", Tel: "+phoneNumber1;
                                   
                                   }
                                   if(phoneNumber2 !==""){
                                   tempNBCChicagoResultsString+= '<span class="tellFonts"> / <a class = "phoneNumberStyle" href ="tel: '+phoneNumber2+'">'+phoneNumber2+'</a></span><br>'
                                   temp+=", "+phoneNumber2;
                                   
                                   }
                                   
                                   if(fax !==""){
                                   tempNBCChicagoResultsString+= ' <span class="tellFonts">Fax: <a>'+fax+'</a></span>'
                                   temp+=", Fax: "+fax;
                                   
                                   }
                                   if(workTime!==""){
                                   tempNBCChicagoResultsString+= '<br><span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   
                                   }
                                   if(email1!==""){
                                   tempNBCChicagoResultsString+= '<br><span>Email: </span><span class="dirMailStyle"><a class = "phoneNumberStyle" href ="mailto: '+email1+'">'+email1+'</a></span>'
                                   temp+=", Email: "+email1;
                                   
                                   }
                                   if(email2!==""){
                                   tempNBCChicagoResultsString+= ' / <span class="dirMailStyle"><a class = "phoneNumberStyle" href ="mailto: '+email2+'">'+email2+'</a></span>'
                                   temp+=", Email: "+email2;
                                   
                                   }
                                   if (platform.iphone) {
                                   tempNBCChicagoResultsString+='</section><span class="smsBtn" ><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempNBCChicagoResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   if(i!==(dataset.length-1))
                                   tempNBCChicagoResultsString+='<li class="listgap"></li> '
                                   
                                   }
                                   }
                                   else
                                   tempNBCChicagoResultsString='This directory does not contain any contacts currently'
                                   document.getElementById("loadNBCChicagoResults").innerHTML= tempNBCChicagoResultsString;
                                   });
                     });
    
}

//Function to fetch NBC New York Directory data
function showNBCNewYorkDirectoryRecords(){
    tempNBCNewYorkResultsString="";
    myDB.transaction(function (tx) {
                     tx.executeSql('SELECT * FROM directory,location WHERE location.location_id=2 AND location.location_id=directory.location_id ORDER BY department_service_name', [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
                                   
                                   tempNBCNewYorkResultsString+= '<li class="dirCntGrnt" ><div class="lisHdGrnt"><p id="header">'+deptServiceName+'</p></div><section>'
                                   
                                   temp+=deptServiceName;
                                   if(contactPerson1 !==""){
                                   tempNBCNewYorkResultsString+= '<span>'+contactPerson1
                                   temp+=", Contact: "+contactPerson1;
                                   }
                                   if(contactPerson2 !==""){
                                   tempNBCNewYorkResultsString+= '/ '+contactPerson2
                                   temp+=" / "+contactPerson2;
                                   
                                   }
                                   if((contactPerson1 !=="")||(contactPerson2 !=="")){
                                   tempNBCNewYorkResultsString+= '</span><br>'
                                   }
                                   
                                   if(bldgNumber !==""){
                                   tempNBCNewYorkResultsString+='<span>Building: '+bldgNumber+'<br></span>'
                                   temp+=", Building: "+bldgNumber;
                                   
                                   }
                                   if(phoneNumber1 !==""){
                                   tempNBCNewYorkResultsString+= '<span class="tellFonts">Tel: <a href ="tel: '+phoneNumber1+'">'+phoneNumber1+'</a></span>'
                                   temp+=", Tel: "+phoneNumber1;
                                   
                                   }
                                   if(phoneNumber2 !==""){
                                   tempNBCNewYorkResultsString+= '<span class="tellFonts">/ <a href ="tel: '+phoneNumber2+'">'+phoneNumber2+'</a></span><br>'
                                   temp+=", "+phoneNumber2;
                                   
                                   }
                                   if(fax !==""){
                                   tempNBCNewYorkResultsString+= ' <span class="tellFonts">Fax: <a>'+fax+'</a></span>'
                                   temp+=", Fax: "+fax;
                                   
                                   }
                                   if(workTime!==""){
                                   tempNBCNewYorkResultsString+= '<br><span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   
                                   }
                                   if(email1!==""){
                                   tempNBCNewYorkResultsString+= '<br><span>Email: </span><span class="dirMailStyle"><a href ="mailto: '+email1+'">'+email1+'</a></span>'
                                   temp+=", Email: "+email1;
                                   
                                   }
                                   if(email2!==""){
                                   tempNBCNewYorkResultsString+= '/ <span class="dirMailStyle"><a href ="mailto: '+email2+'">'+email2+'</a></span>'
                                   temp+=", Email: "+email2;
                                   
                                   }
                                   if (platform.iphone) {
                                   tempNBCNewYorkResultsString+='</section><span class="smsBtn"><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"  ><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempNBCNewYorkResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'"  onclick="importContact(this)"></a></span></li>'
                                   }
                                   if(i!==(dataset.length-1))
                                   tempNBCNewYorkResultsString+='<li class="listgap"></li> '
                                   
                                   }
                                   }
                                   else
                                   tempNBCNewYorkResultsString='This directory does not contain any contacts currently'
                                   document.getElementById("loadNBCNewYorkResults").innerHTML= tempNBCNewYorkResultsString;
                                   });
                     });
    
}


function showDepartmentServicesData(){
    initDB();
    tempUnivStudiosProductionServices="";
    var tempDepartmentServiceName = sessionStorage.departmentService;
    var tempLocationName = sessionStorage.locationName;
    document.getElementById("departmentName").innerHTML= tempDepartmentServiceName;
    myDB.transaction(function (tx) {
                     tx.executeSql('SELECT * FROM directory,department,location WHERE directory.department_id=department.department_id AND department_name='+'"'+tempDepartmentServiceName+'" AND location.location_id=directory.location_id AND location_name='+'"'+tempLocationName+'" ORDER BY department_service_name', [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
                                   description = item['description'];
                                   temp+=deptServiceName;
                                   tempUnivStudiosProductionServices+= '<li class="proCntGrnt"><section><div class="proCnt_header"><p><span class="headerTitle" style="word-wrap:break-word;width:100%">'+deptServiceName
                                   
                                   if(workTime !==""){
                                   tempUnivStudiosProductionServices+= '<span class="workingTime"> ('+workTime+')</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   tempUnivStudiosProductionServices+= '</span></p></div><div class="div-table">'
                                   
                                   if(description !==""){
                                   tempUnivStudiosProductionServices+= '<div class="div-table-row"><div class="single-table-col '
                                   if(fax==""){
                                   tempUnivStudiosProductionServices+= 'noFax"><div id="descriptionScroll"><div class="cnt">'+description+'.</div></div></div></div>'
                                   }
                                   else{
                                   tempUnivStudiosProductionServices+= '"><div id="descriptionScroll"><div class="cnt">'+description+'.</div></div></div></div>'
                                   }
                                   }
                                   if(contactPerson1 !==""){
                                   temp+=", Contact: "+contactPerson1;
                                   tempUnivStudiosProductionServices+= '<div class ="div-table-row"><div class="div-table-col"><small>Contact:&nbsp;</small></div><div class="div-table-col2"><small>'+contactPerson1
                                   }
                                   if(contactPerson2 !==""){
                                   temp+=" /  "+contactPerson2;
                                   tempUnivStudiosProductionServices+= ' / '+contactPerson2
                                   }
                                   
                                   if(((contactPerson1 !=="")||(contactPerson2 !==""))&&(bldgNumber.trim().length!=0)){
                                   tempUnivStudiosProductionServices+='<strong>, Bldg:</strong> '+bldgNumber
                                   }
                                   if((contactPerson1 =="")&&(contactPerson2 =="")&&(bldgNumber.trim().length!=0)){
                                   tempUnivStudiosProductionServices+= '<div class ="div-table-row"><div class="div-table-col"><small>Contact:&nbsp;</small></div><div class="div-table-col2"><small><strong>Bldg: </strong>'+bldgNumber+'</small></div></div>'
                                   }
                                   else if((contactPerson1 !=="")||(contactPerson2 !==""||(bldgNumber.trim().length!=0))){
                                   tempUnivStudiosProductionServices+='</small></div></div>'
                                   temp+=", Building: "+bldgNumber;
                                   }
                                   if(phoneNumber1 !==""){
                                   tempUnivStudiosProductionServices+='<div class="div-table-row"><div class="div-table-col"><small>Telephone:&nbsp;</small></div><div class="div-table-col2"><small><a href="tel:'+phoneNumber1+'">'+phoneNumber1+'</a>'
                                   temp+=", Tel: "+phoneNumber1;
                                   }
                                   if(phoneNumber2 !==""){
                                   tempUnivStudiosProductionServices+= ' / <a href="tel:'+phoneNumber2+'">'+phoneNumber2+'</a>'
                                   temp+=", "+phoneNumber2;
                                   }
                                   if((phoneNumber1 !=="")||(phoneNumber2 !=="")){
                                   tempUnivStudiosProductionServices+= '</small></div></div>'
                                   }
                                   if(fax!==""){
                                   tempUnivStudiosProductionServices+= '<div class="div-table-row"><div class="div-table-col"><small>Fax:&nbsp;</small></div><div class="div-table-col2" ><small><a>'+fax+'</a></small></div></div>'
                                   }
                                   if(email1!==""){
                                   tempUnivStudiosProductionServices+= '<div class="div-table-row"><div class="div-table-col"><small class="emailRow">E-Mail:&nbsp;</small></div><div class="div-table-col2"><small class="emailRow" ><a href="mailto:'+email1+'">'+email1+'</a>'
                                   temp+=", Email: "+email1;
                                   }
                                   if(email2 !==""){
                                   tempUnivStudiosProductionServices+= ' / <a href="mailto:'+email2+'">'+email2+'</a>'
                                   temp+=", Email: "+email2;
                                   }
                                   
                                   locationName=item["location_name"];
                                   tempUnivStudiosProductionServices+= '</small></div></div></div>'
                                   
                                   if(locationName=="Universal Studios"){
                                   if (platform.iphone) {
                                   
                                   tempUnivStudiosProductionServices+= '</section><span class="smsBtn"><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span><span class="locationBtn" ><a id="'+deptServiceName+'" onclick="getServiceDetails(this)"></a></span></li>'
                                   }
                                   else {
                                   tempUnivStudiosProductionServices+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'"  onclick="importContact(this)" ></a></span><span class="locationBtn"><a id="'+deptServiceName+'" onclick="getServiceDetails(this)"></a></span></li>'
                                   }
                                   }
                                   else{
                                   if (platform.iphone) {
                                   tempUnivStudiosProductionServices+= '</section><span class="smsBtn"><a id="'+deptServiceName+'"  onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'"  onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempUnivStudiosProductionServices+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn" ><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span><a ></a></span><span class="locationBtn"><a id="'+deptServiceName+'" onclick="getServiceDetails(this)"></a></span></li>'
                                   }
                                   
                                   
                                   }
                                   if(i!==(dataset.length-1)){
                                   tempUnivStudiosProductionServices+='<li class="listgap"></li> '
                                   
                                   
                                   
                                   }
                                   }
                                   }
                                   else
                                   tempUnivStudiosProductionServices='No data available'
                                   document.getElementById("loadUnivStudiosProductionServicesResults").innerHTML= tempUnivStudiosProductionServices;
                                   });
                     });
}// Directory Services - End

/*
 * Initialise the database.
 */
function initDB() {
    try {
        if(!window.openDatabase) {
            alert('Not supported');
        } else {
            // create the database
            var shortName = 'FMD_DB';
            var version = '1.0';
            var displayName = 'FMDDatabase';
            var maxSize = 3*1024*1024;
            myDB = openDatabase(shortName, version, displayName, maxSize);
        }
    } catch (e) {
        // Error handling code goes here.
        if(e == INVALID_STATE_ERR) {
            // Version number mismatch.
            alert("Invalid database version.");
        } else {
            alert("Unknown error " + e + ".");
        }
        return;
    }
    
    createTables();
    //Called only once
    myDB.transaction(function (tx) {
                     tx.executeSql("SELECT * FROM directory" , [], function (tx, result){
                                   dataset = result.rows;
                                   if(!dataset.length>0){
                                   insertRecords();
                                   }
                                   });
                     });
    
}

// Import Contacts - Begin
var phoneContacts=new Array();
var contactCount=0;
function importContact(element){
	var departmentServiceName = element.id;
    var currentLocation=localStorage.getItem("currentLocationId");
    
	myDB.transaction(function(transaction) {
                     transaction.executeSql('select * from directory where department_service_name =? and location_id=?',[departmentServiceName,currentLocation], importContactSuccessHandler, errorHandler);
                     });
}
function importContactSuccessHandler(transaction, results) {
    
	dataset = results.rows;
    
	if(dataset.length>0){
       	item = dataset.item(0);
        
    	var departmentServiceName=item['department_service_name'];
        
		var building = item['bldg_specific_number'];
		var person1 =item['contact_person1'];
		var person2 =item['contact_person2'];
		person2+=" - ";
		var phone1 =item['phone_number1'];
		var phone2 = item['phone_number2'];
		var faxNumber = item['fax'];
		var mail1 = item['email1'];
		var mail2 = item['email2'];
        var locationId=item['location_id'];
        
        var contact = navigator.contacts.create();
        var name = new ContactName();
        name.familyName = person1;
        name.givenName= departmentServiceName;
        contact.name = name;
        
        // store contact phone numbers in ContactField[]
        var phoneNumbers = [];
        
        phoneNumbers[0] = new ContactField();
        phoneNumbers[0].type='work';    //We can have 'work' and 'home' numbers
        phoneNumbers[0].value= phone1;
        phoneNumbers[0].preferred=true;// preferred number
        if(faxNumber.length>0){
            phoneNumbers[1] = new ContactField();
            phoneNumbers[1].type='fax';    //We can have 'work' and 'home' numbers
            phoneNumbers[1].value=faxNumber;
            phoneNumbers[1].preferred=true;
        }
        if(phone2.length>0){
            phoneNumbers[2] = new ContactField();
            phoneNumbers[2].type='other';    //We can have 'work' and 'home' numbers
            phoneNumbers[2].value=phone2;
            phoneNumbers[2].preferred=true;
        }
        contact.phoneNumbers = phoneNumbers;
        
        // store contact phone numbers in ContactField[]
        var emailAddress = [];
        emailAddress[0] = new ContactField();
        emailAddress[0].type='work';    //We can have 'work' and 'home' numbers
        emailAddress[0].value=mail1;
        emailAddress[0].preferred=true;// preferred number
        
        if(mail2.length>0){
            emailAddress[1] = new ContactField();
            emailAddress[1].type='other';    //We can have 'work' and 'home' numbers
            emailAddress[1].value=mail2;
            emailAddress[1].preferred=true;
        }
        contact.emails = emailAddress;
        
        var location=new Array("Universal Studios","New York","Chicago");
        
        var ctAddress=[];
        ctAddress[0]= new ContactAddress();
        if(building.trim().length>0){
            ctAddress[0].streetAddress="Bldg - "+ building+ "," ;
        }
        
        ctAddress[0].country=location[locationId-1] ;
        
        contact.addresses=ctAddress;
        
        contact.save(onSaveSuccess,onSaveError);
        phoneContacts[contactCount]= departmentServiceName;
        contactCount++;
    }
}
// onSaveSuccess: Get a snapshot of the current contacts
function onSaveSuccess(contact) {
    navigator.notification.alert('Contact Saved Successfully!',{},'Import Contact','Done');
    
}

// onSaveError: Failed to get the contacts
function onSaveError(contactError) {
    navigator.notification.alert('Contact Saved Successfully!',{},'Import Contact','Done');
}

function errorHandler(transaction, error) {
	alert('Error was ' + error.message + ' (Code ' + error.code + ')');
}

// Import Contacts - End

//SMS Composer - Start
function composeSMS(element){
    var departmentServiceName = element.id;
    var currentLocation=localStorage.getItem("currentLocationId");
    
	myDB.transaction(function(transaction) {
                     transaction.executeSql('select * from directory where department_service_name =? and location_id=?',[departmentServiceName,currentLocation], composeSMSSuccessHandler, errorHandler);
                     });
    
}
function composeSMSSuccessHandler(transaction, results){
    
	dataset = results.rows;
    
	if(dataset.length>0){
       	item = dataset.item(0);
        
    	var departmentServiceName=item['department_service_name'];
        
		var building = item['bldg_specific_number'];
		var person1 =item['contact_person1'];
		var person2 =item['contact_person2'];
        var workTime = item['work_time'];
		var phone1 =item['phone_number1'];
		var phone2 = item['phone_number2'];
		var faxNumber = item['fax'];
		var mail1 = item['email1'];
		var mail2 = item['email2'];
        var locationId=item['location_id'];
        var desc=item['department_service_name'];
        
        
        var temp="";
        temp+=departmentServiceName;
        if(person1 !==""){
            
            temp+=", Contact: "+person1;
        }
        if(building !==""){
            
            temp+=", Building: "+building;
        }
        if(phone1 !==""){
            
            temp+=", Tel: "+phone1;
        }
        if(phone2 !=="" && phone1 !=""){
            
            temp+=", "+phone2;
        }
        else if(phone2 !=="" && phone1 =="")
        {
            temp+=", Tel: "+phone2;
        }
        if(faxNumber !==""){
            
            temp+=", Fax: "+faxNumber;
        }
        if((workTime!=="")&&(deptServiceName =="Foley")){
            
            temp+=", Timings: "+workTime;
        }
        else if(workTime!==""){
            
            temp+=", Timings: "+workTime;
        }
        if(mail1!==""){
            
            temp+=", Email: "+mail1;
        }
        if(mail2!=="" && mail1!=""){
            
            temp+=", "+mail2;
        }
        else if(mail2!=="" && mail1==""){
            
            temp+=", Email: "+mail2;
        }
        
        
    } //end of if
    window.plugins.smsComposer.showSMSComposer('', temp);
    
}
function errorHandler(transaction, error) {
	alert('Error was ' + error.message + ' (Code ' + error.code + ')');
}

// SMS Composer End

// Directory Services - Begin
var tempSearchResultsString;
var tempUnivStudiosResultsString;
var tempNBCNewYorkResultsString;
var tempNBCChicagoResultsString;
var tempUnivStudiosProductionServices;
var deptServiceName;
var bldgNumber;
var contactPerson1;
var contactPerson2;
var phoneNumber1;
var phoneNumber2;
var fax;
var workTime;
var email1;
var email2;
var description;
var locationName;




// Function to fetch data from database and display based on search, for all three locations
function showSearchDirectoryRecords(searchWord)
{
    tempSearchResultsString="";
    myDB.transaction(function (tx) {
                     tx.executeSql("SELECT department_service_name,bldg_specific_number,contact_person1,contact_person2,phone_number1,phone_number2,fax,work_time,email1,email2,location_name FROM directory,location WHERE directory.location_id=location.location_id AND (contact_person1 LIKE '%"+searchWord+"%' OR contact_person2 LIKE '%"+searchWord+"%' OR department_service_name LIKE '%"+searchWord+"%') ORDER BY department_service_name", [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
								   locationName = item['location_name'];
                                   
                                   tempSearchResultsString+= '<li class="dirCntGrnt" ><div class="lisHdGrnt"><p id="header">'+deptServiceName+'</p></div><section><b class="locationBold">'+locationName+' </b>'
                                   temp+=deptServiceName;
                                   if(contactPerson1 !==""){
                                   tempSearchResultsString+= '<span>'+contactPerson1+'</span><br>'
                                   temp+=", Contact: "+contactPerson1;
                                   }
								   if(contactPerson2 !==""){
                                   tempSearchResultsString+= ' / <span>'+contactPerson2+' </span>'
                                   temp+=" / "+contactPerson2;
                                   }
                                   if(bldgNumber !==""){
                                   tempSearchResultsString+='<span>Building: '+bldgNumber+'<br></span>'
                                   temp+=", Building: "+bldgNumber;
                                   }
                                   if(phoneNumber1 !==""){
                                   tempSearchResultsString+= '<span class="tellFonts">Tel: <a href ="tel: '+phoneNumber1+'">'+phoneNumber1+'</a></span>'
                                   temp+=", Tel: "+phoneNumber1;
                                   }
                                   if(phoneNumber2 !==""){
                                   tempSearchResultsString+= '<span class="tellFonts"> / <a href ="tel: '+phoneNumber2+'">'+phoneNumber2+'</a></span><br>'
                                   temp+=", "+phoneNumber2;
                                   }
                                   
                                   if(fax !==""){
                                   tempSearchResultsString+= ' <span class="tellFonts">Fax: <a>'+fax+'</a></span>'
                                   temp+=", Fax: "+fax;
                                   }
                                   if((workTime!=="")&&(deptServiceName =="Foley")){
                                   tempSearchResultsString+= '<span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   else if(workTime!==""){
                                   tempSearchResultsString+= '<br><span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   
                                   if(email1!==""){
                                   tempSearchResultsString+= '<br><span>Email: </span><span class="dirMailStyle"><a href ="mailto: '+email1+'">'+email1+'</a></span>'
                                   temp+=", Email: "+email1;
                                   }
                                   if(email2!==""){
                                   tempSearchResultsString+= ' / <span class="dirMailStyle"><a href ="mailto: '+email2+'">'+email2+'</a></span>'
                                   temp+=", Email: "+email2;
                                   }
                                   
                                   // tempSearchResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" onclick="composeSMS(this);"><a ></a></span><span id="'+deptServiceName+'" class="addBtn" onclick="importContact(this)"><a ></a></span></li><li class="listgap"></li>'
                                   if (platform.iphone) {
                                   tempSearchResultsString+='</section><span class="smsBtn"><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempSearchResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   if(i!==(dataset.length-1))
                                   tempSearchResultsString+='<li class="listgap"></li> '
                                   
                                   }
                                   
                                   }
                                   else
                                   tempSearchResultsString=' No records match your search criteria.'
                                   document.getElementById("loadSearchResults").innerHTML= tempSearchResultsString;
                                   });
                     });
};


//Function to fetch Universal Studios Directory data
function showUniversalStudiosDirectoryRecords(){
    tempUnivStudiosResultsString="";
    myDB.transaction(function (tx) {
                     tx.executeSql('SELECT * FROM directory,location WHERE location.location_id=1 AND location.location_id=directory.location_id ORDER BY department_service_name', [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
                                   
                                   tempUnivStudiosResultsString+= '<li class="dirCntGrnt" ><div class="lisHdGrnt"><p id="header">'+deptServiceName+'</p></div><section>'
                                   temp+=deptServiceName;
                                   
                                   if(contactPerson1 !==""){
                                   tempUnivStudiosResultsString+= '<span>'+contactPerson1
                                   temp+=", Contact: "+contactPerson1;
                                   }
                                   if(contactPerson2 !==""){
                                   tempUnivStudiosResultsString+= ' / '+contactPerson2
                                   temp+=" / "+contactPerson2;
                                   
                                   }
                                   if((contactPerson1 !=="")||(contactPerson2 !=="")){
                                   tempUnivStudiosResultsString+= '</span><br>'
                                   }
                                   if(bldgNumber !==""){
                                   tempUnivStudiosResultsString+='<span>Building: '+bldgNumber+'<br></span>'
                                   temp+=", Building: "+bldgNumber;
                                   }
                                   if(phoneNumber1 !==""){
                                   tempUnivStudiosResultsString+= '<span class="tellFonts">Tel: <a class = "phoneNumberStyle" href ="tel: '+phoneNumber1+'">'+phoneNumber1+'</a></span>'
                                   temp+=", Tel: "+phoneNumber1;
                                   }
                                   if(phoneNumber2 !==""){
                                   tempUnivStudiosResultsString+= '<span class="tellFonts"> / <a class = "phoneNumberStyle" href ="tel: '+phoneNumber2+'">'+phoneNumber2+'</a></span><br>'
                                   temp+=", "+phoneNumber2;
                                   }
                                   
                                   if(fax !==""){
                                   tempUnivStudiosResultsString+= ' <span class="tellFonts">Fax: <a>'+fax+'</a></span>'
                                   temp+=", Fax: "+fax;
                                   }
                                   if((workTime!=="")&&(deptServiceName =="Foley")){
                                   tempUnivStudiosResultsString+= '<span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   else if(workTime!==""){
                                   tempUnivStudiosResultsString+= '<br><span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   if(email1!==""){
                                   
                                   tempUnivStudiosResultsString+= '<br><span>Email: </span><span class="dirMailStyle" ><a class = "phoneNumberStyle" href ="mailto: '+email1+'">'+email1+'</a></span>'
                                   temp+=", Email: "+email1;
                                   }
                                   if(email2!==""){
                                   tempUnivStudiosResultsString+= ' / <span class="dirMailStyle"><a class = "phoneNumberStyle" href ="mailto: '+email2+'">'+email2+'</a></span>'
                                   temp+=", Email: "+email2;
                                   }
                                   if (platform.iphone) {
                                   tempUnivStudiosResultsString+='</section><span class="smsBtn"><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempUnivStudiosResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   if(i!==(dataset.length-1))
                                   tempUnivStudiosResultsString+='<li class="listgap"></li> '
                                   
                                   }
                                   }
                                   else
                                   tempUnivStudiosResultsString='This directory does not contain any contacts currently'
                                   document.getElementById("loadUnivStudiosResults").innerHTML= tempUnivStudiosResultsString;});
                     });
    
}

//Function to fetch NBC Chicago Directory data

function showNBCChicagoDirectoryRecords(){
    tempNBCChicagoResultsString="";
    myDB.transaction(function (tx) {
                     tx.executeSql('SELECT * FROM directory,location WHERE location.location_id=3 AND location.location_id=directory.location_id ORDER BY department_service_name', [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
                                   
                                   tempNBCChicagoResultsString+= '<li class="dirCntGrnt" ><div class="lisHdGrnt"><p id="header">'+deptServiceName+'</p></div><section>'
                                   temp+=deptServiceName;
                                   if(contactPerson1 !==""){
                                   tempNBCChicagoResultsString+= '<span>'+contactPerson1
                                   temp+=", Contact: "+contactPerson1;
                                   }
                                   if(contactPerson2 !==""){
                                   tempNBCChicagoResultsString+= ' / '+contactPerson2
                                   temp+=" / "+contactPerson2;
                                   
                                   }
                                   if((contactPerson1 !=="")||(contactPerson2 !=="")){
                                   tempNBCChicagoResultsString+= '</span><br>'
                                   }
                                   if(bldgNumber !==""){
                                   tempNBCChicagoResultsString+='<span>Building: '+bldgNumber+'<br></span>'
                                   temp+=", Building: "+bldgNumber;
                                   
                                   }
                                   if(phoneNumber1 !==""){
                                   tempNBCChicagoResultsString+= '<span class="tellFonts">Tel: <a class = "phoneNumberStyle" href ="tel: '+phoneNumber1+'">'+phoneNumber1+'</a></span>'
                                   temp+=", Tel: "+phoneNumber1;
                                   
                                   }
                                   if(phoneNumber2 !==""){
                                   tempNBCChicagoResultsString+= '<span class="tellFonts"> / <a class = "phoneNumberStyle" href ="tel: '+phoneNumber2+'">'+phoneNumber2+'</a></span><br>'
                                   temp+=", "+phoneNumber2;
                                   
                                   }
                                   
                                   if(fax !==""){
                                   tempNBCChicagoResultsString+= ' <span class="tellFonts">Fax: <a>'+fax+'</a></span>'
                                   temp+=", Fax: "+fax;
                                   
                                   }
                                   if(workTime!==""){
                                   tempNBCChicagoResultsString+= '<br><span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   
                                   }
                                   if(email1!==""){
                                   tempNBCChicagoResultsString+= '<br><span>Email: </span><span class="dirMailStyle"><a class = "phoneNumberStyle" href ="mailto: '+email1+'">'+email1+'</a></span>'
                                   temp+=", Email: "+email1;
                                   
                                   }
                                   if(email2!==""){
                                   tempNBCChicagoResultsString+= ' / <span class="dirMailStyle"><a class = "phoneNumberStyle" href ="mailto: '+email2+'">'+email2+'</a></span>'
                                   temp+=", Email: "+email2;
                                   
                                   }
                                   if (platform.iphone) {
                                   tempNBCChicagoResultsString+='</section><span class="smsBtn" ><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempNBCChicagoResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   if(i!==(dataset.length-1))
                                   tempNBCChicagoResultsString+='<li class="listgap"></li> '
                                   
                                   }
                                   }
                                   else
                                   tempNBCChicagoResultsString='This directory does not contain any contacts currently'
                                   document.getElementById("loadNBCChicagoResults").innerHTML= tempNBCChicagoResultsString;
                                   });
                     });
    
}

//Function to fetch NBC New York Directory data
function showNBCNewYorkDirectoryRecords(){
    tempNBCNewYorkResultsString="";
    myDB.transaction(function (tx) {
                     tx.executeSql('SELECT * FROM directory,location WHERE location.location_id=2 AND location.location_id=directory.location_id ORDER BY department_service_name', [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
                                   
                                   tempNBCNewYorkResultsString+= '<li class="dirCntGrnt" ><div class="lisHdGrnt"><p id="header">'+deptServiceName+'</p></div><section>'
                                   
                                   temp+=deptServiceName;
                                   if(contactPerson1 !==""){
                                   tempNBCNewYorkResultsString+= '<span>'+contactPerson1
                                   temp+=", Contact: "+contactPerson1;
                                   }
                                   if(contactPerson2 !==""){
                                   tempNBCNewYorkResultsString+= '/ '+contactPerson2
                                   temp+=" / "+contactPerson2;
                                   
                                   }
                                   if((contactPerson1 !=="")||(contactPerson2 !=="")){
                                   tempNBCNewYorkResultsString+= '</span><br>'
                                   }
                                   
                                   if(bldgNumber !==""){
                                   tempNBCNewYorkResultsString+='<span>Building: '+bldgNumber+'<br></span>'
                                   temp+=", Building: "+bldgNumber;
                                   
                                   }
                                   if(phoneNumber1 !==""){
                                   tempNBCNewYorkResultsString+= '<span class="tellFonts">Tel: <a href ="tel: '+phoneNumber1+'">'+phoneNumber1+'</a></span>'
                                   temp+=", Tel: "+phoneNumber1;
                                   
                                   }
                                   if(phoneNumber2 !==""){
                                   tempNBCNewYorkResultsString+= '<span class="tellFonts">/ <a href ="tel: '+phoneNumber2+'">'+phoneNumber2+'</a></span><br>'
                                   temp+=", "+phoneNumber2;
                                   
                                   }
                                   if(fax !==""){
                                   tempNBCNewYorkResultsString+= ' <span class="tellFonts">Fax: <a>'+fax+'</a></span>'
                                   temp+=", Fax: "+fax;
                                   
                                   }
                                   if(workTime!==""){
                                   tempNBCNewYorkResultsString+= '<br><span>Timings: '+workTime+'</span>'
                                   temp+=", Timings: "+workTime;
                                   
                                   }
                                   if(email1!==""){
                                   tempNBCNewYorkResultsString+= '<br><span>Email: </span><span class="dirMailStyle"><a href ="mailto: '+email1+'">'+email1+'</a></span>'
                                   temp+=", Email: "+email1;
                                   
                                   }
                                   if(email2!==""){
                                   tempNBCNewYorkResultsString+= '/ <span class="dirMailStyle"><a href ="mailto: '+email2+'">'+email2+'</a></span>'
                                   temp+=", Email: "+email2;
                                   
                                   }
                                   if (platform.iphone) {
                                   tempNBCNewYorkResultsString+='</section><span class="smsBtn"><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"  ><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempNBCNewYorkResultsString+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'"  onclick="importContact(this)"></a></span></li>'
                                   }
                                   if(i!==(dataset.length-1))
                                   tempNBCNewYorkResultsString+='<li class="listgap"></li> '
                                   
                                   }
                                   }
                                   else
                                   tempNBCNewYorkResultsString='This directory does not contain any contacts currently'
                                   document.getElementById("loadNBCNewYorkResults").innerHTML= tempNBCNewYorkResultsString;
                                   });
                     });
    
}


function showDepartmentServicesData(){
    initDB();
    tempUnivStudiosProductionServices="";
    var tempDepartmentServiceName = sessionStorage.departmentService;
    var tempLocationName = sessionStorage.locationName;
    document.getElementById("departmentName").innerHTML= tempDepartmentServiceName;
    myDB.transaction(function (tx) {
                     tx.executeSql('SELECT * FROM directory,department,location WHERE directory.department_id=department.department_id AND department_name='+'"'+tempDepartmentServiceName+'" AND location.location_id=directory.location_id AND location_name='+'"'+tempLocationName+'" ORDER BY department_service_name', [], function (tx, result) {
                                   dataset = result.rows;
                                   
                                   if(dataset.length>0){
                                   
                                   for (var i = 0, item = null; i < dataset.length; i++) {
                                   var temp="";
                                   item = dataset.item(i);
                                   deptServiceName = item['department_service_name'];
                                   bldgNumber = item['bldg_specific_number'];
                                   contactPerson1 =item['contact_person1'];
                                   contactPerson2 =item['contact_person2'];
                                   phoneNumber1 =item['phone_number1'];
                                   phoneNumber2 = item['phone_number2'];
                                   fax = item['fax'];
                                   workTime = item['work_time'];
                                   email1 = item['email1'];
                                   email2 = item['email2'];
                                   description = item['description'];
                                   temp+=deptServiceName;
                                   tempUnivStudiosProductionServices+= '<li class="proCntGrnt"><section><div class="proCnt_header"><p><span class="headerTitle" style="word-wrap:break-word;width:100%">'+deptServiceName
                                   
                                   if(workTime !==""){
                                   tempUnivStudiosProductionServices+= '<span class="workingTime"> ('+workTime+')</span>'
                                   temp+=", Timings: "+workTime;
                                   }
                                   tempUnivStudiosProductionServices+= '</span></p></div><div class="div-table">'
                                   
                                   if(description !==""){
                                   tempUnivStudiosProductionServices+= '<div class="div-table-row"><div class="single-table-col '
                                   if(fax==""){
                                   tempUnivStudiosProductionServices+= 'noFax"><div id="descriptionScroll"><div class="cnt">'+description+'.</div></div></div></div>'
                                   }
                                   else{
                                   tempUnivStudiosProductionServices+= '"><div id="descriptionScroll"><div class="cnt">'+description+'.</div></div></div></div>'
                                   }
                                   }
                                   if(contactPerson1 !==""){
                                   temp+=", Contact: "+contactPerson1;
                                   tempUnivStudiosProductionServices+= '<div class ="div-table-row"><div class="div-table-col"><small>Contact:&nbsp;</small></div><div class="div-table-col2"><small>'+contactPerson1
                                   }
                                   if(contactPerson2 !==""){
                                   temp+=" /  "+contactPerson2;
                                   tempUnivStudiosProductionServices+= ' / '+contactPerson2
                                   }
                                   
                                   if(((contactPerson1 !=="")||(contactPerson2 !==""))&&(bldgNumber.trim().length!=0)){
                                   tempUnivStudiosProductionServices+='<strong>, Bldg:</strong> '+bldgNumber
                                   }
                                   if((contactPerson1 =="")&&(contactPerson2 =="")&&(bldgNumber.trim().length!=0)){
                                   tempUnivStudiosProductionServices+= '<div class ="div-table-row"><div class="div-table-col"><small>Contact:&nbsp;</small></div><div class="div-table-col2"><small><strong>Bldg: </strong>'+bldgNumber+'</small></div></div>'
                                   }
                                   else if((contactPerson1 !=="")||(contactPerson2 !==""||(bldgNumber.trim().length!=0))){
                                   tempUnivStudiosProductionServices+='</small></div></div>'
                                   temp+=", Building: "+bldgNumber;
                                   }
                                   if(phoneNumber1 !==""){
                                   tempUnivStudiosProductionServices+='<div class="div-table-row"><div class="div-table-col"><small>Telephone:&nbsp;</small></div><div class="div-table-col2"><small><a href="tel:'+phoneNumber1+'">'+phoneNumber1+'</a>'
                                   temp+=", Tel: "+phoneNumber1;
                                   }
                                   if(phoneNumber2 !==""){
                                   tempUnivStudiosProductionServices+= ' / <a href="tel:'+phoneNumber2+'">'+phoneNumber2+'</a>'
                                   temp+=", "+phoneNumber2;
                                   }
                                   if((phoneNumber1 !=="")||(phoneNumber2 !=="")){
                                   tempUnivStudiosProductionServices+= '</small></div></div>'
                                   }
                                   if(fax!==""){
                                   tempUnivStudiosProductionServices+= '<div class="div-table-row"><div class="div-table-col"><small>Fax:&nbsp;</small></div><div class="div-table-col2" ><small><a>'+fax+'</a></small></div></div>'
                                   }
                                   if(email1!==""){
                                   tempUnivStudiosProductionServices+= '<div class="div-table-row"><div class="div-table-col"><small class="emailRow">E-Mail:&nbsp;</small></div><div class="div-table-col2"><small class="emailRow" ><a href="mailto:'+email1+'">'+email1+'</a>'
                                   temp+=", Email: "+email1;
                                   }
                                   if(email2 !==""){
                                   tempUnivStudiosProductionServices+= ' / <a href="mailto:'+email2+'">'+email2+'</a>'
                                   temp+=", Email: "+email2;
                                   }
                                   
                                   locationName=item["location_name"];
                                   tempUnivStudiosProductionServices+= '</small></div></div></div>'
                                   
                                   if(locationName=="Universal Studios"){
                                   if (platform.iphone) {
                                   
                                   tempUnivStudiosProductionServices+= '</section><span class="smsBtn"><a id="'+deptServiceName+'" onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span><span class="locationBtn" ><a id="'+deptServiceName+'" onclick="getServiceDetails(this)"></a></span></li>'
                                   }
                                   else {
                                   tempUnivStudiosProductionServices+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn"><a id="'+deptServiceName+'"  onclick="importContact(this)" ></a></span><span class="locationBtn"><a id="'+deptServiceName+'" onclick="getServiceDetails(this)"></a></span></li>'
                                   }
                                   }
                                   else{
                                   if (platform.iphone) {
                                   tempUnivStudiosProductionServices+= '</section><span class="smsBtn"><a id="'+deptServiceName+'"  onclick="composeSMS(this);"></a></span><span class="addBtn"><a id="'+deptServiceName+'"  onclick="importContact(this)"></a></span></li>'
                                   }
                                   else {
                                   tempUnivStudiosProductionServices+='</section><span id="'+deptServiceName+'" class="smsBtn" ><a href="sms:?body='+temp+' "></a></span><span class="addBtn" ><a id="'+deptServiceName+'" onclick="importContact(this)"></a></span><a ></a></span><span class="locationBtn"><a id="'+deptServiceName+'" onclick="getServiceDetails(this)"></a></span></li>'
                                   }
                                   
                                   
                                   }
                                   if(i!==(dataset.length-1)){
                                   tempUnivStudiosProductionServices+='<li class="listgap"></li> '
                                   
                                   
                                   
                                   }
                                   }
                                   }
                                   else
                                   tempUnivStudiosProductionServices='No data available'
                                   document.getElementById("loadUnivStudiosProductionServicesResults").innerHTML= tempUnivStudiosProductionServices;
                                   });
                     });
}// Directory Services - End
