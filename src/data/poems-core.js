/* ============================================================
   Bacchon Ki Kahani — Poem Data
   ------------------------------------------------------------
   IMPORTANT: Ye poems ORIGINAL hain, isliye koi copyright
   issue nahi hai. Inhe aap free mein use, print, record,
   apni website par daal sakte hain.

   Har poem me 3 bhashaayein hain:
     hi = Hindi, gu = Gujarati, en = English
   ============================================================ */

window.KG = window.KG || {};

KG.CLASSES = [
  { id: "play", label: "Play Group", age: "2 – 3 saal", emoji: "🧸" },
  { id: "lkg",  label: "LKG / Nursery", age: "3 – 4 saal", emoji: "🎈" },
  { id: "ukg",  label: "UKG / KG", age: "4 – 5 saal", emoji: "🎨" },
  { id: "c1",   label: "Class 1", age: "6 – 7 saal", emoji: "📚" }
];

KG.POEMS = [
  /* ---------------------------------------------------------- PLAY GROUP */
  {
    id: "p-chandu",
    title: { hi: "चाँद जी कैसे आए", gu: "ચાંદ જી કેવી રીતે આવ્યા", en: "How the Moon Came" },
    classId: "play",
    scene: ["night", "moon", "stars", "child"],
    videoNote: "Apna video link yahan daalein",
    poem: {
      hi: `चाँद जी आए आसमान में,
      चमक-चमक करे मोती माँ।
      तारे जी ने पूछा — चाँद भइया,
      क्यूँ आज तुम आए हो?

      चाँद ने कहा — मैं यहाँ आया,
      रात को सबको रोशन करे।
      छोटे बच्चे सोए हैं सब,
      मीठी-मीठी कहानी सुनाए।`,

      gu: `ચાંદ જી આવ્યા આકાશમાં,
      ચમક-ચમક કરે મોતી માં.
      તારા જીએ પૂછ્યો — ચાંદ ભાઈ,
      શું આજ તું આવ્યો છે?

      ચાંદ બોલ્યો — હું અહીં આવ્યો,
      રાતને સૌને રોશન કરું.
      નાના બાળકો સૂઈ ગયા છે,
      મીઠી-મીઠી કહાણી સુનાવું.`,

      en: `The Moon came up in the sky,
      shining bright like a pearl.
      The little stars said — Moon, where are you from?
      Why have you come tonight?

      The Moon said — I am here,
      to give light to the night.
      All the small ones have gone to sleep,
      I will tell a sweet story.` }
  },
  {
    id: "p-hands",
    title: { hi: "मेरे हाथ", gu: "મારા હાથ", en: "My Hands" },
    classId: "play",
    scene: ["day", "child", "hands"],
    poem: {
      hi: `मेरे हैं दो हाथ, दो प्यारे हाथ,
      हाथों से खेलूँ, हाथों से गाऊँ।
      ऊपर ऊपर, नीचे नीचे,
      ताली बजाऊँ — clap, clap, clap!

      पानी पीता हूँ, खाना खाता हूँ,
      दोस्तों को गले लगाता हूँ।
      मेरे हैं दो हाथ, दो प्यारे हाथ,
      इनसे काम होता हर एक काम!`,

      gu: `મારા છે બે હાથ, બે પ્યારા હાથ,
      હાથથી રમું, હાથથી ગાઉં.
      ઉપર ઉપર, નીચે નીચે,
      ટાલી વજાવું — clap, clap, clap!

      પાણી પીઉં, ખાવું ખાઉં,
      મિત્રોને ગળે ભીળતો.
      મારા છે બે હાથ, बે પ્યારા હાથ,
      આથી કામ થાય દરેક કામ!`,

      en: `I have two hands, two lovely hands,
      with hands I play, with hands I sing.
      Up and up, and down and down,
      I clap my hands — clap, clap, clap!

      I drink the water, I eat my food,
      I hug my friends and make them happy.
      I have two hands, two lovely hands,
      they help me do every single thing!` }
  },
  {
    id: "p-duck",
    title: { hi: "बत्तख पानी में", gu: "બતખ પાણીમાં", en: "The Duck in the Pond" },
    classId: "play",
    scene: ["day", "pond", "duck"],
    poem: {
      hi: `बत्तख बत्तख पानी में,
      तैरता आए डब-डब-डब।
      पानी में नहाए, पानी में खेले,
      नन्हा सा दिल जब-बब!`,

      gu: `બતખ બતખ પાણીમાં,
      તેરતો આવે ડબ-ડબ-ડબ.
      પાણીમાં નહાયે, પાણીમાં ખેલે,
      નાનો સો દિલ જબ-બબ!`,

      en: `A duck, a duck, inside the pond,
      comes swimming — splash, splash, splash.
      She bathes in water, she plays in water,
      with a little heart — flap, flap!` }
  },

  /* ---------------------------------------------------------------- LKG */
  {
    id: "p-friends",
    title: { hi: "मेरे दोस्त", gu: "મારા મિત્રો", en: "My Friends" },
    classId: "lkg",
    scene: ["day", "child", "bird", "tree"],
    poem: {
      hi: `मेरे हैं मित्र — अगला, पगला,
      चिड़िया, खरगोश, और चूहा साया।
      हाथ मिलाते, साथ में खाते,
      गाना गाते — कभी नहीं गवाते।

      जब मैं गिरूँ, तो उठाते हैं,
      जब रूझूँ, तो हँसाते हैं।
      मेरे हैं मित्र — अगला, पगला,
      सबको छोड़कर मेरा प्यारा!`,

      gu: `મારા છે મિત્રો — આગળ, પાગળ,
      ચીડિયું, ખરગોશ, અને નાંદો સાયો.
      હાથ મળાવે, સાથે ખાય,
      ગીત ગાય — કદી નહીં ગવાય.

      જ્યારે હું પડું, ત્યારે ઊઠાવે,
      જ્યારે રડું, ત્યારે હસાવે.
      મારા છે મિત્રો — આગળ, પાગળ,
      સૌને છોડીને મારો પ્યારો!`,

      en: `I have friends — brave ones, silly ones,
      a bird, a rabbit and a little mouse.
      We hold hands, we eat together,
      we sing songs — forever and ever.

      When I fall down, they lift me up,
      when I cry, they make me laugh.
      I have friends — brave ones, silly ones,
      they love me more than anyone!` }
  },
  {
    id: "p-apple",
    title: { hi: "मेरा लाल सेब", gu: "મારું લાલ સફરજન", en: "My Red Apple" },
    classId: "lkg",
    scene: ["day", "tree", "apple"],
    poem: {
      hi: `सेब गुलाबी, सेब लाल,
      ऊपर ऊपर टाँगा देता पेड़।
      ऊपर गई तो बादलों पे,
      नीचे आई तो रही मेरी गोद में।

      धोता हूँ मैं रोज़ सुबह-सुबह,
      मीठे मुँह से बोलूँ — गुड मॉर्निंग माँ!`,

      gu: `સફરજન ગુલાબી, સફરજન લાલ,
      ઉપર ઉપર ઝૂલે છે વૃક્ષ.
      ઉપર ગઈ તો વદલની ઉપર,
      નીચે આવી તો રહી મારી કોડમાં.

      ધોવું છું હું રોજ સવારે,
      મીઠા મોંથે બોલું — ગુડ મોર્નિંગ મા!`,

      en: `An apple pink, an apple red,
      hanging high on the tree.
      I climbed up to the clouds,
      then I rolled down to my lap.

      I wash it every single day,
      with my sweet mouth I say — Good morning, Ma!` }
  },
  {
    id: "p-rain",
    title: { hi: "वर्षा आई", gu: "વરસાદ આવી", en: "The Rain Came" },
    classId: "lkg",
    scene: ["rain", "cloud", "umbrella", "frog"],
    poem: {
      hi: `टप-टप-टप, टप-टप-टप,
      बादलों ने कहा — हम आए!
      छत पर बैठा एक बच्चा,
      छाता लेकर निकल गया।

      कदम-कदम छोटे-छोटे,
      भीग गए सारे नाचते।
      टप-टप-टप, टप-टप-टप,
      फिर धूप, फिर मौसम खुश!`,

      gu: `ટપ-ટપ-ટપ, ટપ-ટપ-ટપ,
      વદલો કહ્યા — અમે આવ્યા!
      છત પર બેઠો એક બાળક,
      છત્રો લઈને બહાર ગયો.

      પગ-પગ નાના-નાના,
      ભીના ગયા સૌ નર્તતા.
      ટપ-ટપ-ટપ, ટપ-ટપ-ટપ,
      ફરી દિવસ, ફરી મોટા ખુશ!`,

      en: `Tap-tap-tap, tap-tap-tap,
      the clouds said — we are here!
      A child was sitting on the roof,
      he took his umbrella and went outside.

      Little steps, hop-hop-hop,
      everybody got wet and danced.
      Tap-tap-tap, tap-tap-tap,
      then the sun, then a happy sky!` }
  },

  /* ---------------------------------------------------------------- UKG */
  {
    id: "p-mother",
    title: { hi: "मेरी मम्मी", gu: "મારી મમ્મી", en: "My Mother" },
    classId: "ukg",
    scene: ["day", "child", "home"],
    poem: {
      hi: `जब था मैं बहुत छोटा,
      मम्मी थी मेरी पहली दुनिया।
      कहती — सो जा मेरे लाल,
      सुबह निकली सुनहरी दी।

      मम्मी के हाथ बनते मिठाई,
      मम्मी की बातें होती सच्ची।
      उनके बिना जगड़ा लगता,
      उनके साथ सब हँसता।

      धन्य है वो, वो धन्य है वो,
      जिसने दिया मुझे सब कुछ,
      उनकी गोद ही मेरा संसार,
      उनका प्यार ही मेरा सहारा।`,

      gu: `જ્યારે હું ઘણું નાનો હતો,
      મમ્મી હતી મારી પ્રથમ દુનિયા.
      કહેતી — સુઈ જા મારા લાલ,
      સવારે નીકળી સુનહરી દી.

      મમ્મીના હાથ બને મીઠાઈ,
      મમ્મીની વાતો હોય સચ્છી.
      તેના વગર ઝઘટો લાગે,
      તેની સાથે બધું હસે.

      ધન્ય છે વો, વો ધન્ય છે વો,
      જેણે આપ્યું મને બધું,
      તેની કોડ મારું સંસાર,
      તેનો પ્યાર મારો સહાર.`,

      en: `When I was very small,
      my mother was my whole first world.
      She would say — sleep now, my son,
      and the morning would come in gold.

      Her hands make the sweetest things,
      her words are always true.
      Without her I feel small,
      with her everything is fine.

      Blessed is she, blessed is she,
      who gave me everything she had.
      Her lap is my whole world,
      her love is my only support.` }
  },
  {
    id: "p-school",
    title: { hi: "मेरा स्कूल", gu: "મારું શાળા", en: "My School" },
    classId: "ukg",
    scene: ["day", "school", "child", "tree"],
    poem: {
      hi: `सुबह आठ बजे गेट खुलता,
      सब दौड़ते हैं अंदर।
      हर बच्चा हँसता है,
      हर बच्चा मास्टर।
      गिनती लगती, हाथ उठता,
      चीख के मिठास भरता।
      खेलते हैं, गाते हैं,
      भरत की ऐसी जगह!

      कल भी आऊँगा सुबह,
      दिल जी लेकर जाऊँगा,
      मेरा स्कूल, मेरा घर,
      दोनों जैसे भाई-बहन।`,

      gu: `સવારે આઠ વાગે બારણું ખૂલે,
      બધા દોડે છે અંદર.
      દરેક બાળક હસે છે,
      દરેક બાળક માસ્ટર.
      ગણતરી લાગે, હાથ ઊપારે,
      ચીસકે મિઠાસ ભરાય.
      રમીએ, ગાઈએ,
      ભારતની આવી જગ!`,

      en: `At eight the gates are opened,
      everybody runs inside.
      Every child is smiling,
      every child is a master.
      Numbers we count, hands we raise,
      the class is full of sweet noise.
      We play, we sing,
      India has a place like this!

      Tomorrow I will come again,
      I will carry my heart with me.
      My school, my home,
      both are like brother and sister.` }
  },
  {
    id: "p-kite",
    title: { hi: "पतंग की उड़ान", gu: "પતંગની ઉડાણ", en: "The Kite Flies High" },
    classId: "ukg",
    scene: ["day", "kite", "tree", "cloud"],
    poem: {
      hi: `पतंग थी मेरी लाल,
      ऊपर आसमान में।
      हवा ने सहारा दिया,
      उड़ी ऐसी खूबसूरत कि रानी!

      धीरे-धीरे ऊपर चढ़ी,
      बादलों को छू गई।
      डोरा थोड़ा ढीला कर दो,
      वापस घर की ओर चली।

      उड़ना गिरने से सीखो,
      ऊँचा सोचो, ऊँचा जाओ।
      डोरा हाथ में मज़बूत रखो,
      फिर आसमान सरकार!`,

      gu: `પતંગ હતી મારી લાલ,
      ઉપર આકાશમાં.
      પવને સાથ આપ્યો,
      ઊડી એવી સુંદર કે રાણી!

      ધીરે-ધીરે ઉપર ચઢી,
      વદલોને છૂઈ ગઈ.
      દોરો થોડો ઢીલો કર દો,
      પાછી ઘર તરફ ચલી.

      ઊડવું પડવાથી શીખો,
      ઊંચું વિચારો, ઊંચું જાઓ.
      દોરો હાથમાં મજબૂત રાખો,
      ફરી આકાશ સરકાર!`,

      en: `My kite was red and bright,
      flying up in the sky.
      The wind held it up high,
      it flew like a beautiful queen!

      Slowly, slowly it climbed,
      it touched the clouds above.
      Let the string go a little loose,
      then it came back toward the house.

      Fly to learn how you will fall,
      think tall, go tall.
      Hold your string with a strong hand,
      then the whole sky is yours!` }
  },

  /* ------------------------------------------------------------- CLASS 1 */
  {
    id: "p-holi",
    title: { hi: "होली का त्यौहार", gu: "હોળીનો તહેવારો", en: "The Festival of Holi" },
    classId: "c1",
    scene: ["day", "colours", "child"],
    poem: {
      hi: `मार्च आया, रंग बरसा,
      हर तरह से रंग बरसा।
      लाल पीला नीला हरा,
      मन में उठा उल्लास भरा।

      गुलाल लगाओ, पानी छींटो,
      चाचा चाची को ठप्प कर दो!
      मिट्टी के पहाड़ बनाओ,
      पिचकुरी को घूमाओ।

      अगले साल फिर आएगा,
      रंगों का त्योहार लाएगा।
      सबको साथ में खेलेंगे,
      सबको गले लगा लेंगे!`,

      gu: `માર્ચ આવ્યો, રંગ ભરાયો,
      દરેક રીતે રંગ ભરાયો.
      લાલ પીળો ભૂરું લીલું હરો,
      મનમાં ઉઠ્યો ઉલ્લાસ ભરો.

      ગુલાલ લગાવો, પાણી છાંટો,
      ચાચા ચાચીને ઠપ્પ કર દો!
      માટીના પહાડ બનાવો,
      પિચકરીને ફેરવો.

      આવતા વર્ષ ફરી આવશે,
      રંગોનો તહેવાર લાવશે.
      બધા સાથે રમીશું,
      બધાને ગળે ભીળીશું!`,

      en: `March has come, the colours fall,
      every kind of colour falls.
      Red and yellow, blue and green,
      my heart is filled with joy.

      Throw the colour, splash the water,
      give our uncle and aunt a shower!
      Make little hills of mud,
      and take the papad round and round.

      Next year it will come again,
      with its festival of colour.
      All of us will play together,
      all of us will hug each other!` }
  },
  {
    id: "p-sun",
    title: { hi: "सूरज का संदेश", gu: "સૂર્યનો સંદેશ", en: "The Sun's Message" },
    classId: "c1",
    scene: ["day", "sun", "cloud", "tree"],
    poem: {
      hi: `सुबह सूरज बोला — उठो,
      खोलो आँखें, धूप पाओ।
      खेत को देता मैं रोशनी,
      सबको देता मैं बलिदानी।

      बीच में बादल आ जाते,
      ढाँक लेते हैं मेरी किरण।
      फिर मैं हँसता-हँसता निकलता,
      करता सबको फिर से शरण।

      मैं सब पर बरसता हूँ,
      बिना किसी के भेदभाव।
      छोटा हो, बड़ा हो,
      सबको प्यार, सबको सुख।`,

      gu: `સવારે સૂર્ય બોલ્યો — ઊઠો,
      આંખ ખોલો, ધોર પાઓ.
      ખેતરને આપું રોશની,
      બધાને આપું બલિદાની.

      વચ્ચે વદલો આ જાય,
      ઢાંકી લે છે મારી કિરણ.
      પછી હું હસતાં-હસતાં નીકળું,
      કરું બધાને ફરી શરણ.

      હું બધા પર વરસું,
      કોઈને તફાવત વગર.
      નાનો હો, મોટો હો,
      બધાને પ્યાર, બધાને સુખ.`,

      en: `In the morning the Sun says — get up,
      open your eyes, take the light.
      I give the fields their shining,
      for everybody I sacrifice my light.

      Sometimes the clouds arrive
      and cover all my rays.
      Then I smile and I come out,
      and give everyone shelter again.

      I fall on everybody,
      without asking who they are.
      Small or tall, rich or poor,
      love for all, care for all.` }
  },
  {
    id: "p-mitri",
    title: { hi: "सच्ची मित्रता", gu: "સાચું મિત્રત્વ", en: "True Friendship" },
    classId: "c1",
    scene: ["day", "child", "tree", "bird"],
    poem: {
      hi: `सच्चा मित्र रखे कभी पीठ पीछे,
      न ऊँचा न नीचा, बस एक समान।
      न आलसी है, न चालाक उसे,
      नहीं रखता मन में कोई छिपान।

      हाथ पकड़े तो ज़िंदगी भर,
      बिगड़ा मामला साथ चले।
      हँसी तो ऐसी कि दुख पतला,
      और दर्द ढल जाए के छले।

      खुशी हो तो दोहरे करे,
      दुख हो तो आधा करे।
      मित्र सच्चा तो सोना जैसा,
      खोने पर भी चमके।`,

      gu: `સાચો મિત્ર રાખે કદી પીઠ પાછળ,
      ન ઊંચો ન નીચો, બસ એક સમાન.
      ન આળસી છે, ન ચાલાક તેને,
      નથી રાખે મનમાં કોઈ છુપાવ.

      હાથ પકડે તો જીવન ભર,
      બગડેલો કામ સાથે ચલે.
      હાસ્ય તો એવું કે દુઃખ પાતળું,
      અને દરદ ઢલ જાય કે છલે.

      ખુશી હો તો બેવડું કરે,
      દુઃખ હો તો અડધું કરે.
      મિત્ર સાચો તો સોના જેવો,
      ખોને પર પણ ચમકે.`,

      en: `A true friend never turns his back,
      neither tall nor low — we are the same.
      Never lazy, never too clever,
      never hiding what he thinks or feels.

      Hold my hand and hold it always,
      walk beside me in my trouble.
      Such laughter that the sorrow thins,
      and the pain washes out completely.

      When I am glad, he doubles it,
      when I am sad, he halves it.
      A true friend is the gold of friends,
      he shines even in the dark.` }
  }
];