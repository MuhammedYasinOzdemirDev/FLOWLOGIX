# FlowLogix Karar Kaydı

## D-001 — Başlangıç taşıma kapsamı

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** MVP yurtiçi, tehlikesiz komple taşımaya odaklanacak. Aynı sevkiyatta temel sıralı duraklar olabilir; farklı siparişlerin parsiyel konsolidasyonu yapılmayacak.
- **Alternatifler:** Parsiyel taşıma; dağıtım; ADR.
- **Neden:** Tek geliştiricili 2–3 aylık MVP'de sipariş bölme, yük birimi, konsolidasyon ve maliyet dağıtımı karmaşıklığını ertelemek.
- **Yeniden değerlendirme:** FLOW-003 sonrası gerçek demo akışında parsiyel ihtiyaç ürünün değerini belirgin biçimde değiştirirse.

## D-002 — Kaynak modeli

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** MVP yalnız özmal araç ve sürücüyü planlayacak.
- **Alternatif:** Özmal + taşeron taşıyıcı.
- **Neden:** Taşıyıcı sözleşmesi, tender, buy-side maliyet ve dış kaynak sorumluluğunu MVP'den çıkarmak.
- **Yeniden değerlendirme:** v0.2 planlaması veya gerçek kullanıcı doğrulaması.

## D-003 — Organizasyon sınırı

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Tek şirket ve tek operasyon şubesi; tenant ve branch izolasyonu uygulanmayacak.
- **Alternatifler:** Tek şirket/çok şube; multi-tenant SaaS.
- **Neden:** Yetki ve veri izolasyonunu ilk sürümde gereksiz büyütmemek.
- **Yeniden değerlendirme:** İkinci firma/şube gerçek kullanım ihtiyacı oluştuğunda.

## D-004 — Teknik mimari

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** .NET 10 modüler monolith, modül içinde use-case odaklı dikey dilimler, karmaşık domainlerde seçici DDD, ASP.NET Core API, SQL Server ve React/TypeScript.
- **Ayrıntı:** Tek veritabanı; modül başına assembly, şema, DbContext ve migration sahipliği. Modül içinde bağımsız `Domain`, use-case bazlı `Features` ve `Infrastructure` alanları bulunur. API yalnız composition root'tur.
- **Bağımlılık kuralı:** Domain framework/persistence bilmez; modüller birbirinin tablolarına veya DbContext'ine erişmez. Registration/mapping yüzeyi dışında modül tipleri mümkün olduğunca `internal` tutulur.
- **Alternatifler:** Katman başına çok sayıda proje; mikroservis; tek monolitik proje.
- **Neden:** Pahalı modül/veri sahipliği kararını baştan doğru kurarken basit context'lere gereksiz DDD ve dağıtık sistem maliyeti yüklememek.
- **Yeniden değerlendirme:** Bağımsız deploy/ölçek veya ekip sahipliği oluşursa.

## D-005 — Kimlik doğrulama

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Same-origin ASP.NET Core Identity cookie ve state-changing API isteklerinde antiforgery.
- **Alternatif:** Ayrı origin/deployment ve token/OIDC.
- **Neden:** Birinci taraf browser uygulamasında token'ı JavaScript'e açmadan daha küçük ve güvenli başlangıç.
- **Yeniden değerlendirme:** Mobil uygulama, public API veya bağımsız frontend deployment gerektiğinde.

## D-006 — Çalışma kapasitesi

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Yol haritası haftada 10–15 saat varsayımıyla planlanacak.
- **Yeniden değerlendirme:** İki hafta üst üste fiili kapasite belirgin farklı çıkarsa.

## D-007 — Git akışı

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** `main` tabanlı kısa ömürlü `feature/FLOW-xxx-*` branch'leri.
- **Kural:** Agent açık onay olmadan commit, merge, rebase veya push yapmaz.
- **Alternatifler:** Doğrudan main; main + develop.
- **Neden:** Solo geliştiricide düşük süreç maliyetiyle güvenli task izolasyonu.

## D-008 — Sipariş–sevkiyat yönü

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Ticari sipariş ve fiziksel sevkiyat ayrı yaşam döngüleridir. Domain gelecekte bir siparişten birden fazla sevkiyatı destekleyecek; MVP başlangıcında tek sevkiyat üretilecek.
- **Neden:** Geleceği kapatmadan split/merge ve miktar dağıtımını ertelemek.
- **Yeniden değerlendirme:** Commercial Order ve Shipment Planning karar kapısında.

## D-009 — Kod yazma yetkisi

- **Tarih:** 2026-06-28
- **Durum:** Bağlayıcı
- **Karar:** Kaynak kodunu kullanıcı yazar. Agent yaşayan Markdown belgelerini güncelleyebilir; yalnız açıkça izin verilen belirli mekanik frontend taskında kaynak kodu değiştirebilir.

## D-010 — Pattern benimseme politikası

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Pattern ve altyapı “gelecekte gerekebilir” diye değil, çözmesi gereken problem ve benimseme kapısı doğrulandığında eklenir.
- **Şimdi uygulanacak:** Modül sınırı, veri sahipliği, dependency direction, use-case sınıfları, DTO/projection ayrımı, gerçek SQL Server testleri, transaction/concurrency değerlendirmesi.
- **Şimdilik uygulanmayacak:** Generic repository, tekrar bir Unit of Work abstraction'ı, MediatR, ayrı read store CQRS, event sourcing, outbox, broker, Redis ve mikroservis deployment.
- **Önemli ayrım:** Write/read use-case'lerini ayırmak tam CQRS altyapısı değildir; append-only `ShipmentEvent` tablosu da event sourcing değildir.
- **Paket notu:** MediatR v13+ lisans şartları ve license key mekanizması nedeniyle ihtiyaç doğarsa teknik yararın yanında lisans da yeniden değerlendirilecek.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-006.

## D-011 — Birleşik mimari pattern seti

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Deployment ve modül sınırında modular monolith; bağımlılık yönünde Clean/Hexagonal ilkeler; modül içinde use-case odaklı Vertical Slice; karmaşık domainlerde seçici tactical DDD kullanılacak.
- **HTTP:** İnce Minimal API endpoint'leri ve modül route group'ları kullanılacak. Endpoint iş kuralı taşımayacak.
- **Persistence:** Modül başına ayrı `DbContext`, SQL şeması ve migration geçmişi bulunacak. Basit handler'lar kendi modül `DbContext`'ini doğrudan kullanabilecek.
- **Proje yapısı:** Her modül başlangıçta tek projede `Domain`, `Features`, `Infrastructure` ve kayıt noktasına ayrılacak. Her modül için dört ayrı Clean Architecture projesi oluşturulmayacak.
- **Soyutlama kuralı:** Generic repository eklenmeyecek. Spesifik repository veya port ancak karmaşık aggregate persistence'ı ya da gerçek dış adapter/test-double ihtiyacı kanıtlandığında eklenecek.
- **Neden:** Domain ve veri sahipliği sınırlarını korurken tek geliştiricinin 2–3 aylık MVP'sinde proje, interface ve mapping yükünü sınırlamak.
- **Yeniden değerlendirme:** Modül karmaşıklığı, ekip büyüklüğü, bağımsız deployment veya ölçülmüş okuma/entegrasyon gereksinimi mevcut sınırı yetersiz kıldığında.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-007.

## D-012 — Repository mühendislik temeli

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** FLOW-001 kapsamında `global.json`, `Directory.Build.props`, `Directory.Packages.props` ve `.editorconfig` ile repository genelinde SDK, build, analiz, paket sürümü ve kod biçimi politikası kurulacak.
- **API temeli:** ASP.NET Core'un birinci taraf OpenAPI üretimi yalnız Development ortamında açılacak. Composition root ortak Problem Details, exception handling ve gövdesiz hata durumlarını standartlaştıracak.
- **Frontend organizasyonu:** React kodu `features/auth`, `features/customers` ile küçük `app` ve `shared` alanları etrafında düzenlenecek.
- **Sınır:** Analyzer/style katılığı kontrollü başlayacak; açıklanmayan geniş “all rules” seti ve ek Swagger UI paketi başlangıçta eklenmeyecek.
- **Neden:** Projeler arasında sessiz ayar ve paket sürümü ayrışmasını önlemek; API sözleşmesi ve hata davranışını ilk dilimden görünür kılmak.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-008.

## D-013 — Teknik kimlik, zaman ve audit politikası

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Kimlik:** Entity teknik anahtarları `Guid` olacak; SQL Server için elle UUID v7 yerine EF Core SQL Server provider'ın `ValueGeneratedOnAdd` sequential GUID üretimi kullanılacak.
- **Zaman:** Olay anları ve audit alanları UTC, sıfır offset'li `DateTimeOffset` olarak saklanacak; uygulama zamanı DI üzerinden `TimeProvider` ile üretilecek.
- **Gösterim:** `Europe/Istanbul` kullanıcı gösterimi ve yerel planlama girdilerinin yorumlanması içindir; storage zamanı UTC kalır.
- **Audit aktörü:** Customer ve Location için `CreatedAtUtc`, `CreatedByUserId`, `LastModifiedAtUtc`, `LastModifiedByUserId` tutulacak. Kullanıcı ID'leri scalar değer olacak; Customers ile Identity tabloları arasında foreign key kurulmayacak.
- **Concurrency:** Create yarışlarını SQL unique constraint koruyacak. `rowversion` ilk gerçek update use case'i geldiğinde değerlendirilecek.
- **Neden:** ERP izlenebilirliğini ve test edilebilir zamanı baştan korurken SQL Server'a uygun kimlik üretmek ve modül persistence bağımlılığı oluşturmamak.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-008.

## D-014 — İlk CI kapısı

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** İlk yerel backend ve frontend build'i yeşil olduktan sonra FLOW-001 kapsamında GitHub Actions eklenecek.
- **Başlangıç kontrolleri:** Backend restore/build/test ile frontend clean install/lint/test/build.
- **Sınır:** Yerelde geçmeyen akış CI'a taşınmayacak; deployment yapılmayacak ve repository secret'ı eklenmeyecek.
- **Neden:** İlk dilimden itibaren tekrarlanabilirliği korumak, fakat henüz çalışmayan iskelet üzerinde CI YAML hata ayıklama maliyeti oluşturmamak.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-008.

## D-015 — .NET test framework ve platformu

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** FlowLogix .NET unit ve integration test projelerinde MSTest SDK ve Microsoft.Testing.Platform kullanacak.
- **Sürüm/runner:** `MSTest.Sdk` sürümü `global.json` içindeki `msbuild-sdks` alanında exact `4.1.0` olarak; .NET 10 test runner'ı `test.runner = Microsoft.Testing.Platform` olarak repository genelinde tanımlanacak.
- **Kural:** Aynı solution koşusunda VSTest ve MTP tabanlı test projeleri karıştırılmayacak.
- **Neden:** .NET 10'da birinci taraf ve güncel test hattını kullanmak; runner/platform extension sürümlerini MSTest SDK ile hizalamak; unit ve integration test altyapısını tek modelde tutmak.
- **Alternatif:** xUnit v3 + MTP güçlü ve geçerli bir alternatiftir; ancak FlowLogix için ekosistem geçiş hareketliliğine karşı birinci taraf, tek SDK hattı tercih edildi.
- **Yeniden değerlendirme:** Gerekli bir test aracı MTP'yi desteklemezse veya doğrulanmış bir framework özelliği eksik kalırsa.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-009.

## D-016 — Mimari doğruluk ve erteleme disiplini

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi
- **Karar:** Bir mekanizma yalnız maliyetli olduğu için ertelenmeyecek. Veri/modül sınırı, dependency direction, güvenlik, audit, transaction ve kalıcı veri kuralları ilgili ilk kullanım öncesinde kurulacak.
- **Erteleme kuralı:** “Sonra bakarız” yeterli değildir. Ertelenen her konu çözdüğü problem, benimseme tetikleyicisi ve yeniden değerlendirme noktasıyla kaydedilecek.
- **Composition contract:** Onaylanan tek-proje-modül yapısında Identity ve Customers kendi service-registration ve endpoint-mapping yüzeylerini taşıyacak. Bu nedenle `Microsoft.AspNetCore.App` framework reference ve public modül giriş noktaları FLOW-001 içinde kurulacak.
- **Domain koruması:** Framework reference assembly seviyesinde olsa da `Domain` altındaki kod ASP.NET Core veya EF Core tipi kullanmayacak. Gerçek domain tipleri oluşunca bu kural architecture test kapısında yeniden değerlendirilecek.
- **Alternatifler:** Endpoint'leri API projesinde toplamak modül sahipliğini zayıflatır; her teknik katmanı ayrı projeye bölmek ise D-011'de seçilmeyen tam katman-proje modeline geçiş olur.
- **İletişim ayrımı:** gRPC ve broker/event-driven iletişim, ayrı süreçler arasındaki iş iletişimi seçenekleridir; aynı process içindeki DI/endpoint composition contract'ının veya Domain–Presentation katman izolasyonunun alternatifi değildir.
- **Fiziksel ayrım kapısı:** Domain katmanında framework bağımlılığı ihlali, bağımsız yeniden kullanım/deployment, ekip sahipliği veya tek assembly'de korunamayan karmaşıklık kanıtlanırsa ilgili modülün Domain/Application/Presentation projelerine ayrılması değerlendirilir; bütün modüller yalnız simetri için bölünmez.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-010.

## D-017 — Ortak modül omurgası, ihtiyaca göre pattern yoğunluğu

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi; D-011 ve D-016'nın uygulama ayrıntısı
- **Karar:** Bütün modüller aynı composition, veri sahipliği, vertical-slice, HTTP hata, authorization ve test standartlarına uyacak; iç domain pattern'leri iş karakterine göre seçilecek.
- **Öğrenme kuralı:** Pattern çeşitliliği gerçek bir problemi görünür kıldığı modülde öğretilecek. Sırf projede farklı teknoloji/pattern bulunsun diye üretim yapısına gereksiz mekanizma eklenmeyecek.
- **Kalibrasyon:** Customers sade ana veri modeli; Orders aggregate/value object; Shipments zengin durum/transaction modeli; Exceptions policy/rule kataloğu; Reporting read model/projection; Notifications process içi event/job modeliyle başlayacak.
- **Event evrimi:** Zorunlu tutarlılık önce aynı transaction; bağımsız yan etki process içi event; dayanıklı dış teslimat outbox; bağımsız tüketici/ölçek broker; bağımsız deployment ve veri sahipliği kanıtlanırsa mikroservis.
- **Fiziksel proje ayrımı:** İlgili modülün domain karmaşıklığı veya framework ihlali kanıtlanırsa yalnız o modül ayrıca ayrılabilir; bütün modüller simetri için zorla aynı proje sayısına çıkarılmaz.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-011.

## D-018 — CI ve aşamalı statik analiz

- **Tarih:** 2026-06-29
- **Durum:** GitHub Actions kabul edildi; SonarQube Cloud aktivasyonu kullanıcı onayı/account işlemi bekliyor
- **CI kararı:** Frontend scaffold ve lockfile sonrası, local backend/frontend komutlarını `pull_request` ve `main` push üzerinde çalıştıran GitHub Actions workflow'u eklenecek.
- **Güvenlik:** Workflow varsayılan read-only permission kullanacak, `pull_request_target` kullanmayacak, third-party action'lar doğrulanmış full commit SHA ile pinlenecek ve secret tracked dosyaya yazılmayacak.
- **Sonar önerisi:** Public FlowLogix repository için self-hosted SonarQube Server yerine SonarQube Cloud Free kullanılacak; server/DB/backup/upgrade işletim yükü alınmayacak.
- **Uyumluluk:** TypeScript 6 kararlı kalacak. Sonar resmi desteği TS6'yı kapsayana kadar ilk analiz C# ile sınırlandırılacak; analiz aracı uğruna frontend 5.9'a düşürülmeyecek.
- **Coverage:** Gerçek testler oluşmadan coverage quality gate bloklaması yapılmayacak. Coverage üretimi Sonar'ın işi değildir; uygun test aracıyla rapor üretildikten sonra import edilecek.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-012.
