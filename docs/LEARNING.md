# FlowLogix Öğrenme Günlüğü

## L-001 — TMS'de sipariş ile sevkiyat aynı şey değildir

- **Bağlam:** Başlangıç domain araştırması
- **ERP/domain öğrenimi:** Sipariş ticari ihtiyeti ve müşteri taahhüdünü; sevkiyat planlanan/yürütülen fiziksel hareketi temsil eder. Durumları ve değişim hızları farklıdır.
- **Tasarım etkisi:** `TransportOrder` ve `Shipment` ayrı tutulacak. İleride 1:N mümkün, ilk MVP davranışı 1:1.
- **Yaygın hata:** Tek tabloya ticari, planlama, execution ve finans durumlarını doldurup geçişleri anlaşılmaz hâle getirmek.

## L-002 — Komple ve parsiyel taşıma yalnız bir enum farkı değildir

- **Bağlam:** MVP kapsam kararı
- **ERP/domain öğrenimi:** Parsiyel taşıma sipariş bölme, yük birimi, konsolidasyon, çoklu pickup/delivery ve ortak maliyet dağıtımı getirir.
- **Tasarım etkisi:** İlk MVP komple taşıma; konsolidasyon ve split davranışı yok.
- **Yaygın hata:** Veri modeline `TransportType=LTL` ekleyip operasyonel sonuçlarını modellememek.

## L-003 — Elektronik belge hazırlığı ile resmi entegrasyon ayrıdır

- **Bağlam:** U-ETDS ve e-İrsaliye araştırması
- **ERP/domain öğrenimi:** Operasyon sistemi gerekli alanları koruyabilir; bu tek başına mevzuata uygun belge üretildiği veya resmi bildirimin yapıldığı anlamına gelmez.
- **Tasarım etkisi:** MVP belge metadata'sı ve taşıma çekirdek alanlarını tutacak, resmi entegrasyon iddiası taşımayacak.
- **Yaygın hata:** Dosya yükleyebilmeyi e-İrsaliye entegrasyonu gibi sunmak.

## L-004 — Event timeline geçmişi korumalıdır

- **Bağlam:** Dijital Sevkiyat Pasaportu
- **ERP/domain öğrenimi:** Operasyon olayları yalnız güncel durum değil, olayın zamanı, aktörü, yeri ve gerekçesidir. Yanlış olayın silinmesi audit zincirini bozar.
- **Tasarım etkisi:** Düzeltme/reversal yeni event olarak yazılacak.
- **Yaygın hata:** Timeline'ı mevcut `Shipment.Status` alanından sonradan üretmeye çalışmak.

## L-005 — Browser authentication'da cookie seçimi CSRF kararını da getirir

- **Bağlam:** FLOW-002 hazırlığı
- **.NET/güvenlik öğrenimi:** HttpOnly cookie token'ı JavaScript'ten uzak tutar; browser cookie'yi otomatik gönderdiği için state-changing isteklerde antiforgery gerekir.
- **Tasarım etkisi:** Same-origin cookie + antiforgery header birlikte uygulanacak.
- **Yaygın hata:** “JWT modern, cookie eski” varsayımıyla browser'da uzun ömürlü token saklamak veya cookie kullanıp CSRF'yi unutmak.

## Sıradaki öğrenme hedefi

FLOW-001 SonarQube ve ilk deployment temelinde:

- Statik analiz, build/test ve deployment kapılarının farklı sorumlulukları
- GitHub OIDC ile uzun ömürlü deployment secret'ı arasındaki güvenlik farkı
- Same-origin React çıktısının ASP.NET Core publish paketine nasıl girdiği
- Ücretsiz compute kotası, SQL kotası, production config ve migration yaşam döngüsü

## L-006 — İyi mimari en fazla pattern değil, doğru değişim maliyetidir

- **Bağlam:** FLOW-001 öncesi mimari araştırması
- **Mimari öğrenimi:** Modül sınırı, veri sahipliği ve dependency direction gibi kararlar sonradan pahalıdır; bunlar baştan kurulur. Mediator, broker, cache ve ayrı read store gibi mekanizmalar ise somut problem oluştuğunda eklenebilir.
- **Tasarım etkisi:** FlowLogix modüler monolith kalacak; modül içinde use-case bazlı dikey dilimler ve karmaşıklığa göre seçici DDD kullanılacak.
- **EF Core öğrenimi:** `DbContext` zaten kısa ömürlü unit-of-work davranışı sağlar. Generic repository otomatik bir zorunluluk değildir; gerçek SQL Server integration testleri önceliklidir.
- **Önemli ayrım:** İş niyetini taşıyan command/query use-case'leri yazmak, ayrı veritabanı ve eventual consistency kullanan tam CQRS kurmakla aynı değildir.
- **Güncel paket dersi:** Kütüphane seçimi yalnız API kolaylığı değildir; sürüm, lisans ve sürdürülebilirlik de mimari maliyettir. MediatR v13+ bu nedenle ihtiyaç doğmadan eklenmeyecek.

## L-007 — Mimari pattern'ler farklı eksenlerde birleşebilir

- **Bağlam:** FLOW-001 öncesi pattern karşılaştırması
- **Mimari öğrenimi:** Clean, Hexagonal ve Onion bağımlılık yönünü; Vertical Slice değişim eksenini; modular monolith deployment ve modül sınırını; DDD iş alanını modellemeyi ele alır.
- **Tasarım etkisi:** FlowLogix modular monolith dış sınırı, modül içinde Vertical Slice organizasyonu, domain çevresinde Clean/Hexagonal bağımlılık ilkesi ve yalnız karmaşık alanlarda tactical DDD kullanacak.
- **Yaygın hata:** Pattern adlarını birbirine rakip şablonlar sanmak veya hepsinin klasör/proje yapısını aynı anda kurmaya çalışmak.

## L-008 — Her kararın doğru zamanı farklıdır

- **Bağlam:** FLOW-001 başlamadan önce hazırlık boşluğu incelemesi
- **Mimari öğrenimi:** Modül sahipliği, dependency direction, SDK/build politikası ve temel veri tipleri sonradan yaygın değişiklik çıkarabileceği için erken belirlenir.
- **Uygulama öğrenimi:** Concurrency token ilk update use case'inde; test reset altyapısı suite büyüdüğünde; Data Protection key storage ise deployment hedefi belli olduğunda seçilir.
- **Yaygın hata:** “Baştan doğru yapma” isteğini bütün muhtemel altyapıları baştan kurmak olarak yorumlamak. Doğrusu, pahalı ve kalıcı kararları erken; yerel ve geri alınabilir kararları ihtiyaç zamanında vermektir.

## L-009 — Test framework ile test platformu farklıdır

- **Bağlam:** FLOW-001 test iskeleti
- **.NET öğrenimi:** MSTest test modelini; Microsoft.Testing.Platform test keşif ve çalıştırma motorunu sağlar. .NET 10 runner seçimi `global.json` içinde repository genelinde yapılabilir.
- **Tasarım etkisi:** Unit ve integration projeleri merkezi `MSTest.Sdk 4.1.0` ve MTP kullanır; integration testleri başlangıçta paralel çalışmaz.
- **Yaygın hata:** VSTest ve MTP projelerini aynı solution koşusunda fark etmeden karıştırmak.

## L-010 — Middleware sırası ve sorumluluğu davranışı değiştirir

- **Bağlam:** FLOW-001 API temeli
- **ASP.NET Core öğrenimi:** `UseExceptionHandler` sonraki middleware/endpoint exception'larını yakalar. `UseStatusCodePages` exception yakalamaz; gövdesiz `4xx/5xx` response dönerken Problem Details gövdesi üretir.
- **Doğrulama:** Development OpenAPI endpoint'i gerçek HTTP isteğinde `200`; bilinmeyen route `application/problem+json`, `404` ve `traceId` döndürdü.
- **Yaygın hata:** `dotnet test` komutunun dependency graph dışında kalan API executable'ını mutlaka yeniden build ettiğini varsaymak.

## L-011 — FrameworkReference paket değildir

- **Bağlam:** Modül composition contract hazırlığı
- **.NET öğrenimi:** `Microsoft.AspNetCore.App` framework reference, ASP.NET Core shared framework'ündeki API'leri class library'ye açar; NuGet paketi gibi ayrıca sürümlenip uygulamaya kopyalanmaz.
- **Mimari etkisi:** Modül endpoint adapter'ları kendi assembly'sinde kalabilir. Buna rağmen Domain source kodunun framework bağımsızlığı isim alanı, review ve gerektiğinde architecture test ile korunmalıdır.

## L-012 — Proje hafızası sohbet hafızasından güçlü olmalıdır

- **Bağlam:** FLOW-001 belge–repository tutarlılık kontrolü
- **Çalışma öğrenimi:** Context özeti ayrıntı kaybedebilir; gerçek dosya/build sonucu ve yaşayan belgeler yeniden başlama noktasıdır.
- **Tasarım etkisi:** Her doğrulanmış adımda ilgili yaşayan belge aynı turda güncellenir; context küçülmesi öncesi handoff kontrolü yapılır.
- **Yaygın hata:** Kod ilerlerken `PROGRESS` ve `BACKLOG` güncellemesini task sonuna bırakmak, sonra eski “sıradaki adım” üzerinden yanlış işe devam etmek.

## L-013 — Composition contract modülün dışarı açılan kapısıdır

- **Bağlam:** FLOW-001.7g.2–3 Identity ve Customers modül sözleşmeleri
- **Mimari öğrenimi:** API composition root modülün iç sınıflarını tek tek bilmek yerine, servis kayıtlarını ve endpoint eşlemesini modülün sunduğu iki public extension method üzerinden çağırır.
- **.NET öğrenimi:** `IServiceCollection` uygulama build edilmeden önce bağımlılık kayıtlarını; `IEndpointRouteBuilder` build sonrasında HTTP route eşlemesini taşır. Aynı nesneyi geri döndürmek çağrı zincirini korur.
- **Tasarım etkisi:** Modül içi tipler mümkün olduğunca dışarı açılmadan kalabilir; public yüzey `Add...Module` ve `Map...Endpoints` ile sınırlanır.
- **Yaygın hata:** Composition root içinde modülün DbContext, handler ve endpoint ayrıntılarını tek tek kaydederek API'yi modülün iç yapısına bağımlı hâle getirmek.

## L-014 — Aynı standart, aynı iç model demek değildir

- **Bağlam:** R-011 modül-pattern araştırması
- **Mimari öğrenimi:** Modüler monolith bütün modüllere veri sahipliği, composition, hata ve test standardı verir; fakat Customers gibi ana veri modülüyle Shipments gibi state/transaction yoğun modül aynı DDD derinliğine zorlanmaz.
- **Pattern öğrenimi:** Aggregate, policy, projection, port/adapter, background consumer ve outbox farklı problemleri çözer. Öğretici çeşitlilik, her pattern'i gerçek ihtiyacın çıktığı modülde görmekten gelir.
- **Event öğrenimi:** Process içi domain/application event ile broker üzerinden integration event aynı teslimat garantisine sahip değildir. Outbox ve idempotency, DB transaction'ı ile broker arasında atomiklik bulunmadığı için anlam kazanır.
- **Yaygın hata:** Basit CRUD modülünü “kurumsal” göstermek için ağırlaştırmak veya append-only timeline gördüğünde sistemi event sourcing sanmak.

## L-015 — Kayıt ve endpoint eşleme farklı başlangıç aşamalarıdır

- **Bağlam:** FLOW-001.7g modül composition doğrulaması
- **ASP.NET Core öğrenimi:** `Add...Module` çağrıları `builder.Build()` öncesinde DI kayıtlarını toplar; `Map...Endpoints` çağrıları build sonrasında modül route'larını host'un endpoint veri kaynaklarına ekler.
- **Mimari etkisi:** API modülün DbContext, handler veya endpoint sınıflarını bilmez; yalnız public composition contract'ı çağırır.
- **Doğrulama:** API → Identity/Customers yönü korunarak solution temiz derlendi; process startup, OpenAPI ve Problem Details HTTP üzerinden çalıştı.
- **Yaygın hata:** Servis kaydını yapmakla HTTP endpointinin otomatik olarak eşlendiğini sanmak veya modülün iç kayıtlarını `Program.cs` içine tek tek taşımak.

## L-016 — CI, statik analiz ve coverage aynı kalite sinyali değildir

- **Bağlam:** FLOW-001.10–11 GitHub Actions/Sonar araştırması
- **CI öğrenimi:** GitHub Actions yereldeki deterministik restore/build/test/lint komutlarını temiz runner'da tekrarlar; çalışması kodun doğru iş kuralını kapsadığını tek başına kanıtlamaz.
- **Analiz öğrenimi:** Sonar statik code-quality/security sorunlarını inceler; test coverage raporunu kendisi üretmez.
- **Güvenlik öğrenimi:** Workflow token'ı least privilege olmalı, secrets repository'ye yazılmamalı ve action tag yerine full commit SHA pinlemek immutable dependency sağlar.
- **Uyumluluk öğrenimi:** Uygulama derleyicisiyle analiz aracının destek matrisi farklı olabilir. Kararlı TypeScript 6'yı seçmek, Sonar'ın o dili henüz tam desteklediği anlamına gelmez.
- **Yaygın hata:** Boş veya değersiz testlerle yüksek coverage üretmek, quality gate'i kalite kanıtı sanmak ya da public repo için gereksiz self-hosted analiz sunucusu işletmek.

## L-017 — Frontend araçları aynı sorumluluğu paylaşmamalıdır

- **Bağlam:** FLOW-001.8a frontend foundation araştırması
- **Frontend öğrenimi:** React UI üretir; React Router URL–ekran eşlemesini; TanStack Query uzak server state cache/senkronizasyonunu; Vite geliştirme/build hattını; Vitest test çalıştırmayı üstlenir.
- **Tasarım etkisi:** FlowLogix Router Declarative Mode kullanacak. API verisini Router loader ile Query arasında bölmeyecek; server state Query'nin sahibi olacak.
- **Sürüm öğrenimi:** Yeni major yalnız “en yeni” olduğu için değil, minimum Node/React/Vite tabanıyla uyumlu ve migration borcu olmadığı için seçilir. React Router 8 kararı bu kapıdan geçti.
- **Güvenlik öğrenimi:** Registry sertifika hatası `strict-ssl=false` ile susturulmaz. Node'un sistem CA desteği güven zincirini koruyarak kullanılabilir.
- **Yaygın hata:** Scaffold çıktısını mimari karar sanmak, test runner olmadan frontend foundation'ı tamamlamak veya Redux/Axios/form kütüphanesini ilk ekranda otomatik eklemek.

## L-018 — React'ta asıl mesele state'in sahibini doğru seçmektir

- **Bağlam:** FLOW-001.8 frontend mimarisi ve HTTP istemcisi araştırması
- **Başlangıç seviyesi:** React ekranı çizer; her bilginin tek bir “asıl defteri” olmalıdır. Filtre URL'de, sunucudan gelen müşteri Query cache'inde, yazılmakta olan input ise bileşende yaşar.
- **React öğrenimi:** Render sırasında hesaplanabilen değer state'e kopyalanmaz; kullanıcı olayının sonucu Effect'e taşınmaz. Effect, React dışındaki bir sistemle senkronizasyon için kaçış kapısıdır.
- **HTTP öğrenimi:** Native fetch `404/500` için otomatik hata fırlatmaz. Güvenilir bir istemci `response.ok`, boş gövde, content type ve Problem Details davranışını açıkça tanımlamalıdır.
- **Mimari etkisi:** Ortak transport politikası `shared/api` içinde, iş endpointleri feature içinde kalır; component doğrudan HTTP ayrıntısını bilmez.
- **Yaygın hata:** Aynı server verisini Query cache, Context ve local state'e birden kopyalamak veya her veri yüklemeyi `useEffect` ile elle yazmak.

## L-019 — ESLint derleyici değil, otomatik kod inceleme kapısıdır

- **Bağlam:** FLOW-001.8b React/Vite scaffold
- **Başlangıç seviyesi:** TypeScript “bu parça teknik olarak derlenebilir mi?” sorusuna; ESLint ise “bu kod seçtiğimiz güvenli yazım kurallarına uyuyor mu?” sorusuna bakar. Duman alarmı yangını söndürmez ama tehlikeli örüntüyü erken bildirir.
- **Pipeline davranışı:** `npm run lint`, `package.json` içindeki `eslint .` script'ini çalıştırır. ESLint repository dosyalarını `eslint.config.js` üzerinden inceler; uygulamayı başlatmaz ve çıktı bundle'ı üretmez.
- **React etkisi:** `eslint-plugin-react-hooks`, hook sırası ve Effect dependency gibi React'ın çalışma modelini bozabilecek hataları; `eslint-plugin-react-refresh` ise geliştirme sırasında Fast Refresh güvenliğini denetler.
- **TypeScript etkisi:** `typescript-eslint`, TypeScript sözdizimini ESLint'e öğretir ve önerilen kuralları uygular. Bu scaffold henüz type-aware lint preset'i kullanmıyor; TypeScript build ayrıca çalışmaya devam eder.
- **Neden Oxlint değil:** Oxlint hızlı ve gelişen bir seçenektir; ancak FlowLogix başlangıcında React'ın resmi ESLint plugin hattı, TanStack Query plugin'i ve geniş eğitim/konfigürasyon ekosistemi daha düşük uyumluluk riski taşır. Performans gerçek sorun olursa yeniden ölçülür.
- **Yaygın hata:** Lint'in başarılı olmasını type-check, test veya çalışan ürün kanıtı saymak. Bunlar ayrı kalite kapılarıdır.

## L-020 — Manifest niyeti, lockfile gerçekleşen dependency ağacını taşır

- **Bağlam:** FLOW-001.8d.1 frontend runtime/dependency sürüm sözleşmesi
- **Başlangıç seviyesi:** `package.json` alışveriş listesi, `package-lock.json` ise marka ve seri numarası dahil teslim alınmış kolilerin tutanağıdır.
- **npm davranışı:** `npm install` dependency ekler/güncellerken manifest ve lockfile'ı değiştirebilir. `npm ci` lockfile ile manifest uyuşmazsa durur, mevcut `node_modules` klasörünü temizler ve dosyalara yazmadan exact ağacı kurar.
- **Runtime ayrımı:** `.nvmrc` yerel/CI exact Node baseline'ıdır; `engines` desteklenen major hattı bildirir; `packageManager` seçilen npm aracını ve sürümünü bildirir.
- **Doğrulama:** Node `24.16.0`, npm `11.13.0`, exact manifest ve lockfile eşleşti; temiz `npm ci` 156 paketi yeniden kurdu, audit 0 bilinen açık bildirdi, ardından lint/build geçti.
- **Yaygın hata:** Lockfile'ı elle düzenlemek, normal geliştirme sırasında `npm ci` ile paket eklemeye çalışmak veya `engines` alanının tek başına her ortamda exact runtime zorladığını sanmak.

## L-021 — NodeNext relative import çözümlemesi dosya uzantısını önemser

- **Bağlam:** FLOW-001.8d.2b Vitest config kurulumu
- **Başlangıç seviyesi:** Config dosyaları tarayıcı bundle'ının değil Node aracının dünyasında çalışır; Node, relative kapının tam adını bilmek ister.
- **TypeScript davranışı:** `tsconfig.node.json` içindeki `module: nodenext`, Node ESM çözümleme kurallarını izler. `noEmit` ve `allowImportingTsExtensions` açık olduğundan `./vite.config.ts` güvenli ve açık import biçimidir.
- **Doğrulama:** Uzantısız import ESLint'ten geçti fakat explicit TypeScript build `TS2307` verdi. `.ts` uzantısı eklendikten sonra aynı lint/build kapıları yeşile döndü.
- **Tasarım etkisi:** Yalnız hatayı susturmak için Node tarafındaki config'i `bundler` çözümlemesine çevirmedik; dosyanın gerçek çalışma ortamıyla uyumlu NodeNext politikasını koruduk.
- **Yaygın hata:** Lint başarılıysa module resolution ve type-check de başarılı sanmak veya tek import hatası için bütün çözümleme modelini değiştirmek.

## L-022 — Component testi iç yapıyı değil görünür kullanıcı sözleşmesini sınar

- **Bağlam:** FLOW-001.8d.2c ilk React component testi
- **Başlangıç seviyesi:** Test, component'in içindeki state kutusunu açıp bakmak yerine kullanıcının gördüğü butona tıklar ve ekrandaki sonuca bakar.
- **Testing Library davranışı:** `getByRole`, erişilebilir DOM rolü ve adını kullanır; `userEvent` click/focus event zincirini asenkron kullanıcı etkileşimi gibi yürütür; jest-dom görünür DOM assertion'ları sağlar.
- **Test izolasyonu:** Ortak setup her testten sonra DOM'u temizler; Vitest mock çağrılarını temizleyip spy'ları geri yükler.
- **Doğrulama:** Vitest `1/1` testi jsdom ortamında geçirdi; ardından ESLint ve TypeScript/Vite production build başarılı oldu.
- **Sınır:** Bu test yalnız Vite demo sayacının geçici keşif testidir, ürün davranışı/coverage kanıtı değildir; uygulama kabuğu oluşunca değiştirilecektir.
- **Yaygın hata:** CSS selector veya component state gibi implementation ayrıntısına bağlanan kırılgan test yazmak, `userEvent` asenkron çağrılarını await etmemek ya da component testini gerçek browser E2E testi sanmak.

## L-023 — Type-aware lint, syntax lint'ten daha derin fakat daha maliyetlidir

- **Bağlam:** FLOW-001.8d.3 frontend lint politikası
- **Başlangıç seviyesi:** Normal lint cümlenin yazımına, type-aware lint ise kelimelerin gerçek anlamına da bakar.
- **TypeScript davranışı:** Project Service her `.ts/.tsx` dosyasını ait olduğu TSConfig ile analiz eder; promise, unsafe type ve benzeri kurallar type-checker bilgisinden yararlanabilir.
- **Framework kapsamı:** Query recommended kuralları Query cache/hook örüntülerini bütün TypeScript kodunda; Testing Library React kuralları yalnız test/spec dosyalarında denetler.
- **Uyumluluk disiplini:** Jest-dom lint plugin'i faydalı olsa da ESLint 10 peer desteği bulunmadığından zorla eklenmedi. Daha çok plugin otomatik olarak daha iyi kalite değildir.
- **Doğrulama:** Type-aware lint, mevcut component testi ve production build başarılı; başlangıç kod tabanındaki çalışma süresi kabul edilebilir.
- **Yaygın hata:** Typed lint'i type-check/build yerine koymak, test kurallarını production dosyalarına yaymak veya peer uyumsuzluğunu `--force` ile gizlemek.

## L-024 — Strict TypeScript tek bayraktan fazlasıdır

- **Bağlam:** FLOW-001.8d.4a TypeScript güvenlik politikası
- **Başlangıç seviyesi:** Strict ayarlar, “bu değer her zaman vardır” gibi iyimser varsayımları kod yazılırken sorgular; runtime'daki boş değer ve eksik dönüş hatalarını erkenden görünür kılar.
- **DTO etkisi:** `exactOptionalPropertyTypes`, alanın hiç gönderilmemesiyle `undefined` gönderilmesini ayırır; `noUncheckedIndexedAccess`, bulunamayan liste/map elemanını olası `undefined` yapar.
- **Akış ve platform etkisi:** `noImplicitReturns` eksik dönüş yolunu; consistent casing Windows'ta gizlenip Linux CI'da kırılabilecek import adını; side-effect import kontrolü yanlış CSS/setup yolunu yakalar.
- **Config ayrımı:** Browser kodu bundler resolution ve DOM/DOM.Iterable; Vite/Vitest config'i NodeNext kullanır. Aynı güvenlik kuralları farklı runtime çözümlemesini ortadan kaldırmaz.
- **Doğrulama:** Type-aware lint, Vitest `1/1` ve explicit TypeScript/Vite build strict ayarlar açıkken geçti.
- **Yaygın hata:** `strict` açık diye index access ve optional-property semantiğinin de en katı hâlde olduğunu varsaymak veya `skipLibCheck` seçeneğini uygulama type-check'i kapatıyor sanmak.

## L-025 — Development proxy browser'a same-origin yüzü verir

- **Bağlam:** FLOW-001.8d.4b–c Vite HTTPS `/api` proxy
- **Başlangıç seviyesi:** Browser tek kapı olarak Vite'ı görür; Vite `/api` ile başlayan istekleri arka taraftaki ASP.NET Core kapısına taşır.
- **Güvenlik davranışı:** API certificate Windows trust store'da trusted; npm lifecycle Node process'i `--use-system-ca` ile bu store'u kullanır. Proxy `secure: true` kaldığı için sertifika doğrulaması atlanmaz.
- **npm ayrımı:** Project `.npmrc` içindeki `node-options` npm registry bağlantısını değil npm'in çalıştırdığı Node lifecycle script'lerini etkiler. Ayrıca exact save ve engine-strict politikasını uygular.
- **Runtime kanıtı:** Vite `5173`, API HTTPS `7185` üzerinde çalışırken `/api/proxy-check`, Kestrel kaynaklı `404 application/problem+json` ve `traceId`; Vite kökü `200` döndürdü.
- **Production ayrımı:** `server.proxy` yalnız Vite development server ayarıdır; production bundle'a girmez. Production'da frontend'i ASP.NET Core aynı origin'de sunacaktır.
- **Yaygın hata:** CORS'u gereksiz açmak, self-signed certificate için `secure: false` kullanmak, browser isteğini doğrudan backend portuna göndererek same-origin cookie modelini bozmak veya Vite proxy'yi production reverse proxy sanmak.

## L-026 — Component kütüphanesi görsel kimlik değildir

- **Bağlam:** FLOW-001.8e.1a–c FlowLogix UI temeli
- **Başlangıç seviyesi:** MUI hazır düğme ve form davranışlarını verir; FlowLogix'in karakterini ise tema token'ları ve ürünün operasyon görselleri oluşturur.
- **Tasarım etkisi:** Operasyon Kontrol Kulesi dili; exception, planned/actual, açıklanabilir atama, belge tamlığı ve kârlılık sapmasından türetilir. Generic admin-template kopyalanmaz.
- **Theme davranışı:** `createTheme` yalnız typed tema nesnesi üretir. `cssVarPrefix: flowlogix`, palette ve component default'ları ThemeProvider ağaca bağlandığında etkili olur.
- **Dependency disiplini:** Phosphor, Motion, Charts, MapLibre ve Data Grid yalnız kendi gerçek use-case kapısında eklenir; görsel iddia uğruna foundation'a yığılmaz.
- **Doğrulama:** MUI v9 tema nesnesi strict TypeScript, type-aware lint ve mevcut Vitest/build kapılarından geçti.
- **Yaygın hata:** Kütüphane varsayılan temasını ürün tasarımı sanmak, ham renk/spacing değerlerini ekranlara dağıtmak veya “havalı” görünüm için bilgi okunabilirliğini feda etmek.

## L-027 — Kaydetmek, formatlamak ve lint etmek farklı işlemlerdir

- **Bağlam:** FLOW-001.8d.5 frontend formatter kapısı
- **Başlangıç seviyesi:** `Ctrl+S` defteri kapatmadan kaydeder; formatter yazıyı ortak şablona dizer; ESLint ise şüpheli kod örüntülerini denetler.
- **Araç davranışı:** `.editorconfig` ortak temel politikayı bildirir. `prettier --write` eşleşen dosyaları değiştirir; `prettier --check` değiştirmeden fark bulur ve CI için başarısız exit code üretir.
- **Tasarım etkisi:** Prettier ve ESLint ayrı script'lerde kalır. Böylece biçim farkı ile gerçek kod kalitesi uyarısı birbirine karışmaz.
- **Doğrulama:** Exact `prettier@3.9.1` kuruldu; ilk `format:check` 14 eski dosyada baseline farkını yakaladı. Kullanıcı baseline'ı uyguladıktan sonra format check, lint, Vitest `1/1` ve production build birlikte geçti.
- **Yaygın hata:** `.editorconfig` bulunduğu için eski dosyaların Ctrl+S ile otomatik yeniden yazılacağını veya lint yeşilken formatın da doğru olduğunu varsaymak.

## L-028 — React bootstrap ortak altyapının uygulamaya giriş kapısıdır

- **Bağlam:** FLOW-001.8e.1c.3 React bootstrap ve provider composition
- **Başlangıç seviyesi:** Provider'ları yazmak, elektrik tesisatını hazırlamaktır; `main.tsx` içinde uygulamayı onlarla sarmak ise ana şalteri bağlar. Altındaki bütün ekranlar ancak bundan sonra tema, Router ve Query context'ine erişir.
- **React davranışı:** `createRoot`, `index.html` içindeki DOM elemanını React ağacının kökü yapar. `StrictMode` development'ta güvenli olmayan render/Effect davranışlarını görünür kılmak için bazı çalışmaları tekrar edebilir; production ağacını çift çalıştırmaz.
- **TypeScript davranışı:** `getElementById` sonucu `HTMLElement | null` olur. Açık `if (!rootElement) throw` kontrolü control-flow narrowing yapar; `!` non-null assertion gibi yalnız derleyiciyi susturmak yerine runtime varsayımını da doğrular.
- **JSX davranışı:** `<AppProviders>...</AppProviders>` çocuk taşıyan açılış/kapanış çiftidir; `<AppProviders />` ise ayrı ve çocuksuz bir kullanım demektir. Girinti runtime semantiğini değiştirmez ancak ağaç yapısını insanlar için görünür kılar; Prettier bu nedenle ayrı kalite kapısıdır.
- **Bundle etkisi:** Provider'lar bootstrap'a bağlanınca MUI, Router ve Query production graph'ına gerçekten girdi; Vite `238` modül ve yaklaşık `111.8 kB` gzip JS raporladı. Bu beklenen foundation maliyetidir; ölçülmüş bütçe sorunu olmadan erken optimizasyon yapılmaz.
- **Doğrulama:** Format check, type-aware ESLint, Vitest `1/1` ve Vite production build birlikte geçti.
- **Yaygın hata:** Provider dosyasının var olmasını etkin sanmak, `null` olasılığını assertion ile gizlemek veya development StrictMode tekrarını production duplicate-request davranışı sanmak.

## L-029 — MUI yerleşim bileşenleri görevlerine göre ayrılır

- **Bağlam:** FLOW-001.8e.1d.3 kalıcı operasyon çerçevesi
- **Başlangıç seviyesi:** `Box`, genel amaçlı bir yerleşim kutusudur; HTML `div` öğesine benzer ve MUI temasını kullanabilir. `Stack`, doğrudan içindeki bileşenleri yatay veya dikey sıraya dizer. `sx`, görünüm kurallarının yazıldığı MUI stil alanıdır.
- **Yerleşim davranışı:** `direction="row"` logo ile yazıyı yan yana getirir; `spacing` aralarındaki boşluğu belirler; `alignItems: 'center'` bunları dikey eksende ortalar.
- **MUI v9 davranışı:** `direction` ve `spacing`, `Stack` bileşeninin kendi özellikleridir. `alignItems` gibi genel görünüm kuralları MUI v9'da doğrudan özellik olmaktan çıkarılmıştır ve `sx` içinde yazılır.
- **TypeScript etkisi:** Geçersiz `alignItems` özelliği önce varsayılan `Stack` imzasını bozdu; TypeScript daha sonra başka imzaları da deneyerek yanıltıcı görünen “component eksik” ayrıntısını gösterdi. Asıl hata mesajın son bölümündeydi.
- **Doğrulama:** Hizalama `sx` içine taşındıktan sonra format, type-aware lint, Vitest `1/1` ve production build birlikte geçti.
- **Yaygın hata:** Derlemenin başarılı olmasını görsel davranışın da doğru olduğu kanıtı saymak veya uzun overload mesajında yalnız ilk satıra bakmak.

## L-030 — Uygulama kurulumu ile ürün özellikleri aynı klasörde toplanmaz

- **Bağlam:** FLOW-001.8e.1d.4a–b frontend klasör sınırı
- **Başlangıç seviyesi:** `app`, uygulamanın parçalarını bir araya getiren merkezdir; `features`, kullanıcının yaptığı işlere ait sayfa ve davranışları taşır. Her dosyayı `app` içine koymak, zamanla sorumluluğu belirsiz bir klasör oluşturur.
- **Sınır:** `AppRoutes`, `AppShell`, sağlayıcılar, tema ve tek QueryClient örneği uygulama genelini kurduğu için `app` altında kalır. Operasyon genel bakışı, müşteri veya sevkiyat gibi ürün kavramları `features` altında bulunur.
- **Bağımlılık yönü:** `app`, özellikleri bir araya getirebilir; ürün özellikleri uygulamanın başlangıç ayrıntılarına bağımlı olmaz. Gerçekten ortak teknik parçalar oluştuğunda `shared` kullanılır; önceden boş klasör açılmaz.
- **Dosya yolu öğrenimi:** `./` mevcut klasörü, `../` bir üst klasörü gösterir. Dosya taşındıktan sonra eski göreli yol lint ve kullanılmayan geçici test tarafından yakalanmadı; bütün TypeScript kaynaklarını denetleyen build `TS2307` verdi.
- **Doğrulama:** Sayfa `features/operations-overview` altına taşındı, `AppRoutes` içe aktarma yolu güncellendi ve format/lint/test/build birlikte geçti.
- **Yaygın hata:** Teknik kontroller yeşil diye klasör sorumluluğunu incelememek veya henüz ortak kullanım oluşmadan `shared` klasörünü genel depoya çevirmek.

## L-031 — İyi hareket dikkati yönlendirir, sürekli dikkat istemez

- **Bağlam:** FLOW-001.8e.1d.5 FlowLogix görsel yenilemesi
- **Başlangıç seviyesi:** Animasyon, ekrandaki parçaların nereden geldiğini veya hangi kartın etkileşimli olduğunu kısa süreyle anlatan bir yön levhası gibi çalışır. Sürekli hareket eden bir ekran ise yön göstermek yerine dikkati tüketir.
- **Uygulama davranışı:** Emotion `keyframes`, ilk görünümde opaklık ve dikey konumu kısa süre içinde değiştirir. Kart üzerine gelme geçişleri yalnız işaretçi kullanan etkileşimde geri bildirim verir; uygulama durumunu veya iş kuralını değiştirmez.
- **Erişilebilirlik:** `prefers-reduced-motion`, kullanıcının işletim sistemi düzeyindeki hareket azaltma tercihini CSS'e taşır. FlowLogix bu tercih etkin olduğunda giriş ve hover hareketlerini kapatır.
- **Test ayrımı:** Vitest, kalıcı çerçevenin ve ürün metninin DOM'da bulunduğunu doğrular; gerçek tarayıcı incelemesi ise taşma, hizalama, okunabilirlik ve konsol sorunlarını kontrol eder. Bu iki kanıt birbirinin yerine geçmez.
- **Doğrulama:** 1280×720 ve 390×844 tarayıcı görünümlerinde yerleşim incelendi; telefon görünümünde yatay taşma, iki görünümde de konsol hata/uyarısı bulunmadı. Format, lint, Vitest `1/1` ve production build geçti.
- **Yaygın hata:** “Havalı” görünüm uğruna sürekli animasyon eklemek, yalnız renkle durum anlatmak veya build başarılı olduğu için responsive görünümü kontrol edilmiş saymak.

## L-032 — Temiz kurulum lockfile sözleşmesini ve ortam kilitlerini görünür kılar

- **Bağlam:** FLOW-001.8f frontend kapanış doğrulaması
- **Başlangıç seviyesi:** Normal geliştirme sırasında paketler uzun süre aynı klasörde kalabilir. `npm ci`, depoyu yeni açmış bir geliştirici gibi mevcut paket klasörünü temizler ve yalnız kilit dosyasındaki kesin sürümleri yeniden kurar.
- **npm davranışı:** `npm ci`, `package.json` ile `package-lock.json` uyuşmazsa durur ve bağımlılık sürümlerini yeniden seçmez. Bu nedenle tekrarlanabilir yerel geliştirme ve CI için daha güçlü bir kapanış kanıtıdır.
- **Windows etkisi:** Çalışan Vite süreci yerel Rolldown dosyasını kullanımda tuttuğu için ilk temizlik `EPERM` ile durdu. Hata dependency uyumsuzluğu değildi; yalnız FlowLogix geliştirme süreçleri kapatıldığında aynı komut başarılı oldu.
- **Doğrulama:** Temiz kurulum 303 paketi yeniden kurdu; ardından format check, type-aware lint, Vitest `1/1` ve production build birlikte geçti.
- **Yaygın hata:** `EPERM` hatasını otomatik olarak bozuk lockfile sanmak, tüm Node/Visual Studio süreçlerini gelişigüzel kapatmak veya temiz kurulumdan sonra kalite kapılarını yeniden çalıştırmamak.

## L-033 — Test komutu explicit solution build'in yerine geçmez

- **Bağlam:** FLOW-001.9 repository restore/build/test kapanışı
- **Başlangıç seviyesi:** Restore gerekli paketleri hazırlar, build bütün projelerin derlenebilirliğini denetler, test ise yalnız test projelerinin keşfettiği senaryoları çalıştırır. Üçü aynı işi yapmaz.
- **Dependency graph etkisi:** API projesi mevcut test projelerinin bağımlılık zincirinde bulunmayabilir. Yalnız `dotnet test` çalıştırmak bu nedenle API'nin güncel kaynakla derlendiğini kanıtlamaz; explicit solution build korunur.
- **Kanıt sınırı:** Mevcut iki backend testi şablon keşif testidir. `2/2` sonucu MSTest/MTP hattının çalıştığını gösterir; müşteri domain kuralları, migration, SQL persistence veya auth davranışı hakkında kanıt üretmez.
- **Doğrulama:** Restore güncel tamamlandı; beş proje `0` uyarı ve `0` hatayla derlendi; iki şablon testi geçti. Temiz frontend kurulumundaki dört kalite kapısıyla birlikte FLOW-001.9 kapandı.
- **Yaygın hata:** Testler geçtiğinde solution'daki bütün projelerin derlendiğini veya test sayısı bulunduğunda gerçek ürün davranışının sınandığını varsaymak.

## L-034 — CI yerel komutların temiz ve tekrarlanabilir uzak kapısıdır

- **Bağlam:** FLOW-001.10b–d ilk GitHub Actions workflow'u
- **Başlangıç seviyesi:** Workflow bütün otomasyon tarifidir; job ayrı bir sanal makinede çalışan iş grubu, step ise o işteki tek komuttur. Backend ve frontend ayrı job olduğu için birbirini beklemeden çalışabilir.
- **Güvenlik:** `permissions: contents: read` workflow'un repository'ye yazmasını engeller. `pull_request_target` kullanılmaz; dış katkı koduna ayrıcalıklı bağlam verilmez. Hazır action'lar değişebilen major etiket yerine doğrulanmış tam commit kimliğine sabitlenir.
- **Tekrarlanabilirlik:** .NET sürümü `global.json`, Node sürümü `.nvmrc`, frontend paketleri `package-lock.json` üzerinden belirlenir. NuGet ve npm cache ölçülmüş ihtiyaç olmadan açılmaz.
- **Yerel/uzak sınırı:** Workflow komutlarının Windows'ta geçmesi güçlü bir ön kontroldür; GitHub'ın `ubuntu-latest` runner'ındaki action indirme, Linux dosya sistemi ve gerçek event bağlamını kanıtlamaz. İlk remote koşu görülmeden required check açılmaz.
- **Doğrulama:** YAML Prettier ve LF kontrolünden geçti. Backend Release restore/build/test ile frontend temiz kurulum/format/lint/test/build komutlarının tamamı yerelde başarılı oldu.
- **Yaygın hata:** Yerel başarıyı remote workflow başarısı saymak, workflow'a gereksiz yazma yetkisi vermek, değişken action etiketi kullanmak veya frontend format kontrolünü CI dışında bırakmak.

## L-035 — Tam commit sabitlemesi güncelleme politikasını ortadan kaldırmaz

- **Bağlam:** FLOW-001.10e Dependabot GitHub Actions politikası
- **Başlangıç seviyesi:** Tam commit kimliği action kodunu belirli bir noktada kilitler; bu güvenilirlik sağlar fakat yeni düzeltmeleri kendiliğinden getirmez. Dependabot yeni sürümü doğrudan uygulamak yerine incelenebilir bir pull request önerir.
- **Kapsam:** `package-ecosystem: github-actions` yalnız `.github/workflows` içindeki dış action referanslarını izler. npm ve NuGet dependency'leri bu taskın kapsamına alınmadı.
- **Bakım dengesi:** Haftalık kontrol günlük PR gürültüsünü azaltır. Üç açık PR sınırı mevcut üç action'ı görünür tutar; güncellemeleri gruplamamak her action'ın release notunu ve CI etkisini ayrı incelemeyi sağlar.
- **Güvenlik sınırı:** Dependabot PR'ları otomatik merge edilmez. Tam SHA değişimi, sürüm açıklaması, release notları ve CI sonucu kullanıcı tarafından incelenir.
- **Doğrulama:** `dependabot.yml` ve `ci.yml` Prettier/YAML biçiminden geçti; her iki dosya LF standardında. FLOW-001.10e tamamlandı.
- **Yaygın hata:** SHA sabitlemesini “artık bakım gerekmez” sanmak, bütün ekosistemleri tek seferde açıp PR gürültüsü üretmek veya CI sonucu görülmeden bot PR'ını otomatik birleştirmek.

## L-036 — Doğrudan yazılmayan geçişli paket de CI'ı durdurabilir

- **Bağlam:** FLOW-001.10f ilk uzak Backend CI koşusu
- **Başlangıç seviyesi:** Bir paket başka bir paketi yanında getirebilir; buna geçişli bağımlılık denir. Proje dosyasında adı görünmese bile güvenlik taraması bu alt paketi denetler.
- **Gerçek davranış:** `Microsoft.AspNetCore.OpenApi 10.0.9`, `Microsoft.OpenApi >= 2.0.0` ister. NuGet uygun en düşük sürüm olan `2.0.0`ı seçti; repository warning-as-error kullandığı için yüksek önem dereceli `NU1903` uyarısı restore işlemini başarısız yaptı.
- **Güvenlik kararı:** Uyarıyı bastırmak sorunu çözmez. Aynı 2.x ana sürüm hattındaki düzeltilmiş ve güncel kararlı `Microsoft.OpenApi 2.9.0` doğrudan sabitlenerek hem güvenlik açığı kapatılabilir hem de gereksiz 3.x kırılma riski alınmaz.
- **Yerel doğrulama:** API paket ağacı hem istenen hem çözümlenen sürümü `2.9.0` olarak gösterdi. Release solution build'i `0` uyarı/`0` hatayla ve iki geçici test başarıyla tamamlandı; solution genelindeki geçişli güvenlik taraması bilinen açık bulmadı.
- **Uzak doğrulama:** Düzeltme PR'a gönderildikten sonra temiz GitHub Ubuntu runner'ında Backend `27s`, Frontend `28s` içinde geçti. Başarısız veya bekleyen kontrol kalmadığı için FLOW-001.10f kapandı.
- **Kanıt sınırı:** Bu sonuç CI mekanizmasını ve mevcut iki keşif testini doğrular; henüz yazılmamış müşteri domain kuralları, SQL persistence veya Identity davranışı için ürün kanıtı değildir.
- **Yaygın hata:** Geçişli bağımlılıkları görünmez sanmak, güvenlik uyarısını `NoWarn` ile susturmak veya güvenli en küçük ana sürüm değişikliği yerine düşünmeden yeni major sürüme geçmek.

## L-037 — Ücretsiz deployment yalnız uygulama sunucusunun fiyatı değildir

- **Bağlam:** FLOW-001.12 deployment hedefi araştırması
- **Başlangıç seviyesi:** Uygulamanın internette açılması yalnız bir web adresi almak değildir; çalışan .NET süreci, kalıcı veritabanı, secret'lar, HTTPS, migration, log, yedek ve kota birlikte düşünülür.
- **Mimari etkisi:** FlowLogix React çıktısını ASP.NET Core üzerinden sunarak tek deployment ve same-origin cookie modelini korur. Frontend'i ayrı statik hosta ayırmak ilk sürümde CORS, cookie ve antiforgery sınırını gereksiz büyütür.
- **Maliyet etkisi:** App Service F1 ücretsizdir fakat günlük CPU, bant genişliği, depolama ve custom-domain sınırları vardır. Azure SQL'in ücretsiz kotası ayrıdır; kota bitince otomatik ücret yerine durma seçeneği özellikle seçilmelidir.
- **Güvenlik etkisi:** Deployment kimliği için uzun ömürlü publish profile yerine kısa ömürlü GitHub OIDC kimliği; uygulama secret'ları için repository yerine App Service ayarları tercih edilir.
- **Zamanlama:** Bulut SQL kaynağı boş foundation için kurulmaz; ilk gerçek migration hazır olduğunda açılır. Bu erteleme mimari kaçış değil, henüz kullanılmayan kalıcı ve güvenlik duyarlı kaynağı oluşturmama disiplinidir.
- **Yaygın hata:** Yalnız web host ücretsiz diye bütün sistemin ücretsiz ve production-ready olduğunu sanmak, otomatik ücret seçeneğini açık bırakmak veya migration'ı uygulama başlangıcında kontrolsüz çalıştırmak.
