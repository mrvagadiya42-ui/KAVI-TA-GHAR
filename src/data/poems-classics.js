/* ============================================================
   कविता का घर — POETRY SET D:  Popular / Classic
   ------------------------------------------------------------
   Ye kavitayen PARAMPARIK (traditional) folk rhymes par
   aadharit hain — jo 100+ saal se ghar-ghar me boli jaati
   hain aur jo PUBLIC DOMAIN me hain (koi author nahi, koi
   copyright nahi).

   Jahan tak suraksha ki baat hai:
     • Hindi/Gujarati/English — teeno mere apne shabdon me
       hain, kisi ki copy nahi.
     • Modern copyrighted kavita (jaise "Ek Thi Didi",
       aaj ke pop songs, film songs) jaan-boojh kar nahi
       daali gayi hain.

   Har poem par `classic: true` laga hai — UI par
   "Traditional" ka chhota tag dikhta hai.
   ============================================================ */

window.KG = window.KG || {};
KG.POEMS.push(

/* ===================================================== PLAY GROUP */
{
  id: "c-twinkle",
  classic: true,
  title: { hi: "ट्विंकल ट्विंकल तारा", gu: "ટ્વિંકલ ટ્વિંકલ તારો", en: "Twinkle Twinkle Star" },
  classId: "play",
  scene: ["night", "moon", "stars", "child"],
  poem: {
    hi: `ट्विंकल-ट्विंकल तारा,
    ऊपर ऊपर आसमान में।
    मोती जैसे दीपक तुम,
    चमक रहे हो मेहराब में।

    नीचे आओ, बैठो पास,
    देखो चाँद की किरण।
    गिनती करो एक-दो-तीन,
    फिर सो जाओ — शुभ प्रात।`,

    gu: `ટ્વિંકલ-ટ્વિંકલ તારો,
    ઉપર ઉપર આકાશમાં.
    મોતી જેવા દીવડા તમે,
    ચમકતા છે અહીં મહેરાબમાં.

    નીચે આવો, બેસો પાસે,
    જુઓ ચાંદની કિરણ.
    ગણતરી કરો એક-બે-ત્રણ,
    પછી સૂઈ જાઓ — શુભ પ્રભાત.`,

    en: `Twinkle, twinkle, little star,
    up above the sky so high.
    Like a pearl, like a little lamp,
    shining in the vault so wide.

    Come down, please, and sit by me,
    look upon the moonbeam.
    Count with me — one, two, three,
    then sleep, it's morning's dream.`
  }
},
{
  id: "c-baabaa",
  classic: true,
  title: { hi: "भेड़ों की भेड़", gu: "માટરી ભેડ", en: "Baa Baa Black Sheep" },
  classId: "play",
  scene: ["day", "child", "tree", "cloud"],
  poem: {
    hi: `काली-काली भेड़ सफ़ेद ऊन,
    तीन थोलियाँ भर दोनों गुन।
    एक अपनी पकड़ ली,
    एक अपने मित्र को दे दी।

    बचा तो थोड़ा सा मेरा,
    मेरे बच्चों को दे दो भला।
    गिनती याद हो जाएगी,
    भेड़ गिनना सबको सिखाना।`,

    gu: `કાળી-કાળી ભેડ સફેદ ઊન,
    ત્રણ થોળીયાં ભરી બંને ગૂન.
    એક પોતાની પકડી લી,
    એક પોતાના મિત્રને આપી દી.

    બચ્યો તો થોડો મારો,
    મારા બાળકોને આપો ભલું.
    ગણતરી યાદ થઈ જશે,
    ભેડ ગણવી સૌને શીખવી.`,

    en: `Baa baa, black sheep, have you any wool?
    Yes sir, yes sir, three bags full.
    One for the master, and one for the dame,
    and one for the little boy who lives down the lane.

    Then says the boy — what of the rest?
    Give it to the children, they're the best.
    Counting sheep is the game we know,
    so count these sheep and watch them grow.`
  }
},
{
  id: "c-chandamama",
  classic: true,
  title: { hi: "चंदमामा दूर के", gu: "ચંદમામા દૂર કે", en: "The Moon Is Far Away" },
  classId: "play",
  scene: ["night", "moon", "stars", "cloud"],
  poem: {
    hi: `चंदमामा दूर के,
    आए तो डर कैसे!
    आप ही मुझे बताओ,
    आप कैसे आते हैं।

      चंदमामा निकले,
    बच्चे सब सो गए।
    फिर सबेरे उठ के,
    देखो चंदा ने मुस्काया!`,

    gu: `ચંદમામા દૂર કે,
    આવો તો ડર કેવી રીતે!
    તમે જ મને કહો,
    તમે કેવી રીતે આવો છો.

    ચંદમામા નીકળ્યા,
    બાળકો બધા સૂઈ ગયા.
    પછી સવારે ઊઠીને,
    જુઓ ચંદાએ મુસ્કાયા!`,

    en: `The moon is far away, you know,
    how does it come and go?
    Won't you tell me, dear old moon,
    how do you travel, on your own?

    The moon has slipped behind the hill,
    every baby sleeps so still.
    And in the morning when they wake,
    they see the moon smile at the break.`
  }
},

/* ========================================================= LKG */
{
  id: "c-mary",
  classic: true,
  title: { hi: "मेरी भेड़", gu: "મારી ભેડ", en: "Mary Had A Little Lamb" },
  classId: "lkg",
  scene: ["day", "child", "cloud"],
  poem: {
    hi: `मेरी थी एक भेड़ सफ़ेद,
    सीधी-सादी, नरम-नरम।
    वो चमकती थी जैसे दूध,
    और मेरी थी बिल्कुल।

      भेड़ ने कहा — मुझे छोड़कर मत जा,
    सदा तेरे साथ रहूँगी।
    चादर हिले तो खूँट उठेगी,
    प्यार से प्यार झरकाऊँगी।`,

    gu: `મારી હતી એક ભેડ સફેદ,
    સીધી-સાદી, નરમ-નરમ.
    એ ચમકતી હતી દૂધ જેવી,
    અને મારી હતી બિલકુલ.

    ભેડ બોલી — મને છોડીને ન જા,
    હંમેશાં તારી સાથે રહીશ.
    ચાદર હલે તો ખૂંટ ઊઠશે,
    પ્યારથી પ્યાર ઝરકાવીશ.`,

    en: `Mary had a little lamb,
    its fleece was white as snow.
    And everywhere that Mary went,
    the lamb was sure to go.

    He followed her to school one day,
    which was against the rules.
    It made the children laugh and smile,
    to see a lamb in schoolroom rules.`
  }
},
{
  id: "c-row",
  classic: true,
  title: { hi: "नाव चलाओ", gu: "હોય ચલાવો", en: "Row Row Row Your Boat" },
  classId: "lkg",
  scene: ["day", "boat", "fish", "cloud"],
  poem: {
    hi: `नाव नाव चलो धीरे-धीरे,
    पानी पर हो हल्का-हल्का।
    मछलियाँ हैं डरा-डराई,
    डूबी जाएँ झट से पल्का!

      तूफ़ान आए तो हट जाओ,
    पत्ते जैसे तैरते जाओ।
    नाव फिर मिलेगी सफ़ेद,
    पानी में डालें खेमल चादर।`,

    gu: `હોય હોય ચલાવો ધીરે-ધીરે,
    પાણી પર હોય હળવું-હળવું.
    માછલીઓ છે ડરેલી-ડરેલી,
    ડૂબી જશે ઝટથી પલક!

    તોફાન આવે તો દૂર જાઓ,
    પાન જેવાં તરતા જાઓ.
    હોય ફરી મળશે સફેદ,
    પાણીમાં નાખીએ રેણ ચાદર.`,

    en: `Row, row, row your boat,
    gently down the stream.
    Merrily, merrily, merrily, merrily,
    life is but a dream.

    If the waves should rise again,
    like a leaf we'll float away.
    We'll row our boat and cross the stream,
    and safe and sound we'll stay.`
  }
},
{
  id: "c-hickory",
  classic: true,
  title: { hi: "हिकोरी डिकोरी डॉक", gu: "હિકરી ડિકરી ડોક", en: "Hickory Dickory Dock" },
  classId: "lkg",
  scene: ["day", "clock", "child"],
  poem: {
    hi: `हिकोरी-डिकोरी डॉक,
    घड़ी में टिक मारी टॉक।
    डॉक की उल्टी खड़ी करो,
    तारे बन गए बड़े-बड़े!

      एक दो तीन, तीन की गिनती,
    बच्चे बोले — हम हैं सच्चे।
    खेल-खेल में गिनती सीख लो,
    ज़िंदगी खेल जैसी मीठी!`,

    gu: `હિકરી-ડિકરી ડોક,
    ઘડિયાળમાં ટિક મારી ટોક.
    ડોકની ઊંધી કરો,
    તારા બની ગયા મોટા-મોટા!

    એક બે ત્રણ, ત્રણની ગણતરી,
    બાળકો બોલ્યા — અમે સાચા.
    રમત-રમતમાં ગણતરી શીખો,
    જીવન રમત જેવું મીઠું!`,

    en: `Hickory, dickory, dock,
    the clock struck one — the mouse ran off.
    Turn the clock back upside down,
    and see the stars come dance around.

    One, two, three — we count it well,
    the children say — we tell the truth.
    Play and learn to count with joy,
    life's a game, and that's the point.`
  }
},
{
  id: "c-rain",
  classic: true,
  title: { hi: "बारिश जा रही", gu: "વરસાદ જતો", en: "Rain Rain Go Away" },
  classId: "lkg",
  scene: ["rain", "cloud", "umbrella", "child"],
  poem: {
    hi: `बारिश बारिश जा रही,
    जा जा गई भाई।
    बच्चे बोले — वापस आ,
    खेलना है हमें आज।

      टप-टप-टप हो रही,
      भीगे सब कपड़े।
    फिर भी खुशी-खुशी गाते,
    "आज छत पर नाचते!"`,

    gu: `વરસાદ વરસાદ જતો,
    જા જા ગયો ભાઈ.
    બાળકો બોલ્યા — પાછા આ,
    રમવું છે આજે મારે.

    ટપ-ટપ-ટપ થાય છે,
    ભીનાં સૌ કપડાં.
    તોય ખુશીથી ગાય છે,
    "આજે છત ઉપર નાચીએ!"`,

    en: `Rain, rain, go away,
    come again another day.
    Little children want to play,
    running around in bright array.

    Pitter patter, pitter patter,
    every dress is wet and wetter.
    Still we sing and jump and cheer,
    "let's dance on the roof right here!"`
  }
},

/* ========================================================= UKG */
{
  id: "c-aao",
  classic: true,
  title: { hi: "आओ बच्चे आओ", gu: "આવો બાળકો આવો", en: "Come Children Come" },
  classId: "ukg",
  scene: ["day", "child", "flower", "bee"],
  poem: {
    hi: `आओ बच्चे आओ, बाहर चलो,
    फूलों के पास ज़रा चलो।
    तितली उड़ी, भेँयू मिला,
    महुँगा तुलना इन्हें रहा।

      हाथ पकड़कर चलो साथ,
    गिनती गिनती में बनाओ राज।
    पेड़ है, पत्ता है, फूल है,
    और मेरे पास है — प्यार का सूज़ा!`,

    gu: `આવો બાળકો આવો, બહાર ચાલો,
    ફૂલના પાસે થોડું ચાલો.
    તીવળી ઉડી, માયફલી મળી,
    મહાન તેને નમતા જ રહી.

    હાથ પકડીને ચાલો સાથે,
    ગણતરીમાં રાજ બનાવો હાથે.
    વૃક્ષ છે, પાન છે, ફૂલ છે,
    અને મારી પાસે છે — પ્યારનું સૂજું!`,

    en: `Come, come, children, come along,
    let us walk beside the flowers.
    A butterfly and a buzzing bee,
    they ask — who has the most powers?

    Hold my hand and walk with me,
    let's make counting into fun.
    There's a tree, there's a leaf, there's a flower,
    and here I've got love — that is the one.`
  }
},
{
  id: "c-chalo",
  classic: true,
  title: { hi: "चलो चलो चलो", gu: "ચલો ચલો ચાલો", en: "Let Us Walk Together" },
  classId: "ukg",
  scene: ["day", "tree", "bird", "child", "cloud"],
  poem: {
    hi: `चलो चलो चलो, पेड़ की छाँव,
    चिड़ियों के गाँव।
    पत्ते हैं झररर, हवा है महका,
    भोली-भोली धूप।

      चलो चलो चलो, नदी किनारे,
    पानी की ओर।
    पत्थरों ने कहा — कदम रखो धीरे,
    यही सिखाए प्यार।

      चलो चलो चलो, साथ-साथ सब,
    कदम एक-से।
    यही है जीवन का सुंदर संगम,
    यही है हमारी पहचान!`,

    gu: `ચલો ચલો ચાલો, વૃક્ષની છાયં,
    ચીડિયાના ગામ.
    પાન છે ઝરરર, પવન મહેકે,
    ભોળી-ભોળી ધોળ.

    ચલો ચલો ચાલો, નદી કિનારે,
    પાણી તરફ.
    પાષાણણે કહ્યું — પગ મૂકો ધીરે,
    આ જ શીખવે પ્યાર.

    ચલો ચલો ચાલો, સાથે-સાથે બધા,
    કદમ એક-જેવા.
    આ જ જીવનનું સુંદર જોડણ,
    આ જ આપણી ઓળખ!`,

    en: `Come walk with me to the tree's shade,
    the village of the birds.
    Leaves go rustle, wind is blowing,
    the sunlight is in words.

    Come walk with me to the river side,
    the water's cool and deep.
    The stones say — put your steps up softly,
    it's love that we must keep.

    Come walk with me, all side by side,
    our steps are one and same.
    This is the beauty of our walk,
    this is our name.`
  }
},
{
  id: "c-titli",
  classic: true,
  title: { hi: "तितली तितली प्यारी", gu: "તીવળી તીવળી પ્યારી", en: "The Little Butterfly" },
  classId: "ukg",
  scene: ["day", "butterfly", "flower", "child"],
  poem: {
    hi: `तितली तितली प्यारी,
    उड़ती है इधर-उधर।
    रंगीन पंख खोलती,
    मीठी-मीठी बात कर।

      फूल बोले — आ जा मेरे पास,
    महक मेरी अच्छी।
    तितली बोली — थोड़ी देर,
    फिर उड़ जाऊँगी कहीं!`,

    gu: `તીવળી તીવળી પ્યારી,
    ઉડે છે અહીં-તહીં.
    રંગીન પાંખ ખોલે છે,
    મીઠી-મીઠી વાત કરે.

    ફૂલ બોલે — આ જા મારી પાસે,
    મહક મારી સુંદર.
    તીવળી બોલે — થોડી વાર,
    પછી ઉડી જઈશ ત્યાં!`,

    en: `Butterfly, butterfly, dear one,
    you fly here and there.
    You open your pretty coloured wings,
    and you flutter everywhere.

    The flower says — please come to me,
    my scent is so sweet.
    The butterfly says — wait a while,
    then off to the other field.`
  }
},
{
  id: "c-prithvi",
  classic: true,
  title: { hi: "धरती माँ", gu: "ધરતી માં", en: "Earth Is Our Mother" },
  classId: "ukg",
  scene: ["day", "mountain", "river", "tree", "bird"],
  poem: {
    hi: `धरती माँ ने बनाया सब,
    पेड़, पहाड़, नदी, रेत-पत्थर।
    हम उसी के बच्चे हैं,
    उसका प्यार हमारा संसार।

      जड़ टिकाए उसने रखी,
    आँखें दिए हमें देखने।
    हाथ उठाओ, कहो — धन्य माँ,
    तूने बनाया हमें!`,

    gu: `ધરતી માએ બનાવ્યા બધું,
    વૃક્ષ, પર્વત, નદી, રેત-પાષાણ.
    અમે એના બાળકો છીએ,
    એનો પ્યાર છે આપણો સંસાર.

    મૂળ ટકાવ્યા એને,
    આંખો આપી અમને જોવાની.
    હાથ ઊપારો, કહો — ધન્ય માં,
    તું બનાવી અમને!`,

    en: `Mother Earth has made us all,
    trees, hills and rivers, sand and stone.
    We are the children of that Earth,
    her love is our world, our own.

    She holds our roots down deep,
    she gives her eyes to see.
    Raise up your hands and thank her now —
    "thank you, Ma, you made me!"`
  }
},
{
  id: "c-holi",
  classic: true,
  title: { hi: "होली है आई", gu: "હોળી છે આવી", en: "Holi Has Come" },
  classId: "ukg",
  scene: ["day", "colours", "child"],
  poem: {
    hi: `होली है आई, होली है आई,
    रंग-बिरंगी लाई।
    गुलाल उठाओ, पिचकुरी पकड़ो,
    कान्जा के खेल लाई।

      लाल-पीला-नीला-हरा,
    चेहरा सबका रंगे।
    बुराई को रहा दूर,
    अच्छाई से जग संभले।

      सबको रंग लगाओ, गले लगाओ,
    माँ को त्यार कराओ।
    होली का ये प्यार मना
    न होने का न बनाओ!`,

    gu: `હોળી છે આવી, હોળી છે આવી,
    રંગ-બિરંગી લાવી.
    ગુલાલ ઊપારો, પિચકરી પકડો,
    કાનજાનો ખેલ લાવી.

    લાલ-પીળું-નીલું-લીલું,
    ઘમેલ સૌનો રંગ.
    ખરાબ થી દૂર રહે,
    સારાઈથી જગ સંભળ.

    બધાને રંગ લગાઓ, ગળે લગાઓ,
    માંને તૈયાર કરાઓ.
    હોળીનો આ પ્યાર ના
    ન હોવાનો ન બનાઓ!`,

    en: `Holi has come, Holi has come,
    with colours it is here.
    Raise up the syringes, catch the pichkari,
    let's play without a fear.

    Red and yellow, blue and green,
    every face is coloured bright.
    May the bad go far away,
    let the good ones hold the light.

    Colour everyone, and hug them too,
    make your mother neat and smart.
    This is the love of Holi,
    don't let it from your heart.`
  }
},

/* ======================================================= CLASS 1 */
{
  id: "c-lakir",
  classic: true,
  title: { hi: "लकीर पक्की", gu: "લકીર પક્કી", en: "Straight Lines" },
  classId: "c1",
  scene: ["day", "child", "kite", "cloud"],
  poem: {
    hi: `लकीर पक्की, लकीर पक्की,
    बना ले बच्चे पक्की!
    एक के बाद दो, दो के बाद तीन,
    नाप से बनती ये पक्की।

      आड़ी-तिरछी, टेढ़ी-मेढ़ी,
    सब डालते हैं पक्की।
    लकीर से बनता घर-दरवाज़ा,
    और स्कूल जाते बच्चे पक्की!`,

    gu: `લકીર પક્કી, લકીર પક્કી,
    બના લે બાળકો પક્કી!
    એક પછી બે, બે પછી ત્રણ,
    માપથી બને છે આ પક્કી.

    આડી-તિરછી, ટેઢી-મેઢી,
    સૌ દોરે છે પક્કી.
    લકીરથી બને ઘર-બારણું,
    અને શાળાએ જાય બાળકો પક્કી!`,

    en: `A straight line, a straight line, draw a line that's true.
    It's the very first thing you learn and the first you'll do.
    One then two and two then three,
    measured lines are what we see.

    Flat and slanted, bent and round,
    we all draw a line or two.
    Doors and houses lines do make,
    and school goes on, the straight ones too!`
  }
},
{
  id: "c-lalo",
  classic: true,
  title: { hi: "लालो लालो", gu: "લાલો લાલ", en: "The Red Day" },
  classId: "c1",
  scene: ["day", "home", "child", "flower"],
  poem: {
    hi: `लालो लालो, लाल हुआ,
    सुबह का सूरज लाल हुआ।
    फूलों ने भी रंग पाया,
    और चिड़ियों ने गाना गाया।

      लाल से होता प्यार पैदा,
    लाल से मन को सजावट।
    खून का रंग ना भूल जाओ,
    वो अपने ही देश का नात।`,

    gu: `લાલો લાલ, લાલો લાલ,
    સવારનો સૂર્ય લાલ.
    ફૂલને પણ રંગ મળ્યો,
    ચીડિયાએ ગીત ગાયું.

    લાલથી પ્યાર પ્રગટે,
    લાલથી મન સજાય.
    લહુનો રંગ ના ભૂલી જવો,
    એ પોતાના દેશનો નાત.`,

    en: `Red is red, and red has come,
    the morning sun is red.
    The flowers too have caught the colour,
    the birds have sung instead.

    From red there grows a loving heart,
    from red the room is gay.
    The red that our own blood has earned,
    is all our country's way.`
  }
},
{
  id: "c-jaal",
  classic: true,
  title: { hi: "जाल की तैयारी", gu: "જાળની તૈયારી", en: "Ready For The Net" },
  classId: "c1",
  scene: ["day", "pond", "fish", "cloud"],
  poem: {
    hi: `जाल की तैयारी हो गई,
    मछलियाँ आती जा रही।
    जाल बिछाया पानी में,
    धीरे से हाथ बढ़ा ले भाई।

      पकड़ी एक डाल के,
    फिर छूट गई हवा के संग!
      बचा तो छोटा सा टोकरा,
    सिखा बड़े का संग।

      आज नहीं पकड़ी कुछ भी,
    पर प्यार सीखा मिला।
    जो चला गया वो छोड़ दो,
    जो रहा उसको गले लगा!`,

    gu: `જાળની તૈયારી થઈ ગઈ,
    માછલીઓ આવે જય.
    જાળ નાખ્યો પાણીમાં,
    ધીરે હાથ લંબાવ ભાઈ.

    પકડી એક ડાલની,
    પછી છૂટી ગઈ પવનની સાથ!
    બચ્યો નાનો ટોકરો,
    શીખ્યો મોટાની સાથ.

    આજે કંઈ પકડ્યું નહીં,
    પણ પ્યાર શીખ્યો મળ્યો.
    જે ચલ્યો એ છોડી દે,
    જે રહ્યો એને ગળે લગા!`,

    en: `The net is ready, spread and wide,
    the fishes come and go.
    We throw it in the water, then
    our hands go very slow.

    One is caught — the branch gave way,
    then wind has carried it!
    Only a small basket we brought back,
    the big lesson of it.

    We caught not any fish today,
    but love we did get.
    The one that went, let it go free,
    the one that stayed, a friend.`
  }
},
{
  id: "c-ginti",
  classic: true,
  title: { hi: "गिनती की कविता", gu: "ગણતરીની કવિતા", en: "A Poem of Counting" },
  classId: "c1",
  scene: ["day", "child", "flower", "bee"],
  poem: {
    hi: `एक मैला दो पानी,
    तीन लकड़ी चार चार पानी।
    पाँच जोड़ी, छह करें,
    सात थैली, आठ करें।

      नौ नौकरी कर दी,
    दस के साथ गिन ली।
      अब गिनती हो गई पूरी,
      मिठाई खा लो बच्चे भूरे!`,

    gu: `એક કપડો બે પાણી,
    ત્રણ લાકડું ચાર ચાર પાણી.
    પાંચ જોડી, છ કરીએ,
    સાત થેલી, આઠ કરીએ.

    નવ નોકરી કરી દીધી,
    દસ સાથે ગણી લીધી.
    હવે ગણતરી પૂરી થઈ,
    મીઠાઈ ખાય માં ભૂર!`,

    en: `One is dirty, two is water,
    three is wood and four's a potter.
    Five is pairs and six is six,
    seven is sacks and eight is fix.

    Nine is nine and I have done,
    ten and I have counted everyone.
    Now our counting has come to close —
    and here's a sweet, so eat up those!`
  }
},
{
  id: "c-vakyo",
  classic: true,
  title: { hi: "वाक्य बनाओ खेल", gu: "વાક્ય બનાવો રમત", en: "The Sentence Game" },
  classId: "c1",
  scene: ["day", "book", "pen", "child"],
  poem: {
    hi: `वाक्य बनाओ, खेल यही,
    कुछ भी गलत नहीं।
    पहले लेटक सा कोई शब्द,
    फिर जोड़ो बड़ा।

      मैंने चाय पी, उसने नहीं,
    ऐसा न हो सकता कभी!
    दो शब्द, फिर तीन जोड़ो,
    छह से बनेगी कविता छबि।

      चमकते अक्षर, खूली सहारा,
    गंभीरता से भी न हो हारा।
    लिखो, सुधारो, फिर सुना दो,
    यही है हमारा अभ्यास-प्यार!`,

    gu: `વાક્ય બનાવો, રમત આ,
    કંઈ પણ ખોટું ના.
    પહેલા લેટક સા કોઈ શબ્દ,
    પછી જોડો મોટો ભાગ.

    મેં ચા પી, એને નહીં,
    આવું ન થઈ શકે કદી!
    બે શબ્દ, પછી ત્રણ જોડો,
    છ થી બનશે કવિતા છબિ.

    ચમકતા અક્ષર, નીચની સહાર,
    ગંભીરતાથી પણ ન હોય હાર.
    લખો, સુધારો, પછી સુનાઓ,
    આ જ છે આપણો અભ્યાસ-પ્યાર!`,

    en: `Make a sentence — that is the game,
    it isn't wrong, it's just a name.
    First take a word that doesn't fit,
    then a bigger one to sit.

    "I drank the tea, he did not" — no,
    that can never ever go!
    Join two words and then a third,
    six will make a poem that's heard.

    Bright letters, lines to hold,
    even with gravity, be bold.
    Write, improve, then read it out —
    this is our practice, this our bout.`
  }
}

);