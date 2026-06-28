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

FLOW-001 source adımında:

- `.sln`, `.csproj` ve project reference farkı
- Modül başına tek proje tercihinin maliyet/faydası
- `global.json` ile SDK sabitleme
- CLI üzerinden tekrarlanabilir restore/build

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
