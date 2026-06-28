# FlowLogix Araştırma Kaydı

## R-001 — Başlangıç taşıma modeli

**Tarih:** 2026-06-28  
**Soru:** Komple mi, parsiyel mi başlanmalı?

### Seçenekler

1. Yurtiçi tehlikesiz komple taşıma ve özmal filo
2. Komple taşıma ile birlikte taşeron kaynak
3. Parsiyel taşıma, yük birimi bölme ve konsolidasyon

### Bulgular

Oracle Transportation Management; order release, ship unit, bölünebilir miktar, çok durak ve shipment oluşturmayı ayrı planlama kavramları olarak ele alır. Parsiyel senaryo yalnız bir hizmet tipi etiketi değildir; sipariş bölme, yük birimi, konsolidasyon, durak ve maliyet dağıtım davranışlarını büyütür.

### Öneri ve karar

İlk MVP yurtiçi, tehlikesiz komple taşıma ve özmal filo ile sınırlandı. Aynı sevkiyat içinde sıralı temel duraklar bulunabilir; farklı siparişleri aynı araca konsolide etme uygulanmayacak.

### Kaynaklar

- [Oracle Transportation Management — Order Management](https://docs.oracle.com/en/cloud/saas/transportation/25c/otmol/configuration/setting_up_otm/order_management.htm)
- [Oracle — Order Releasing Process](https://docs.oracle.com/en/cloud/saas/transportation/25c/otmol/planning/order_manager/create_order_release.htm)
- [Oracle — Order Release Ship Unit](https://docs.oracle.com/en/cloud/saas/transportation/26a/otmol/planning/order_manager/order_release_ship_unit_detail.htm)

## R-002 — Sipariş ve sevkiyat ayrımı

**Tarih:** 2026-06-28

SAP TM ve Oracle TMS, ticari/taşıma ihtiyacını planlanan ve yürütülen taşıma belgesinden ayırır. Bu ayrım; bir siparişin ileride bölünebilmesini, ticari durum ile execution durumunun farklı ilerlemesini ve plan değişikliklerinin geçmişi bozmamasını sağlar.

**Öneri ve karar:** `TransportOrder` ile `Shipment` ayrı modeller olacak. Domain gelecekte `1:N` ilişkiye izin verecek; MVP'nin ilk davranışı bir siparişten tek sevkiyat üretmek olacak.

### Kaynaklar

- [SAP — Freight Order Management](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e3dc5400c1cc41d1bc0ae0e7fd9aa5a2/ff8bbbea9bd0421b9f833793d8d52b3d.html)
- [SAP — Scheduling of Freight Orders](https://help.sap.com/docs/SAP_TRANSPORTATION_MANAGEMENT/54cf405c9d9e4c96bf091967ea29d6a7/4d706c52091f912ee10000000a44538d.html)
- [Oracle — Order Release](https://docs.oracle.com/en/cloud/saas/transportation/25c/otmol/planning/order_manager/or_edit.htm)

## R-003 — U-ETDS ve e-İrsaliye sınırı

**Tarih:** 2026-06-28

UAB kaynakları; ilgili eşya ve lojistik taşımacıları için gönderici/alıcı, plaka, sürücü, yük cinsi-ağırlığı ve yükleme/boşaltma yer-zaman bilgilerini ister. Genel eşya bildiriminde hareketten sonra altı saatlik süre belirtilir. UAB HTML sayfası ile yayımlanan idari PDF'de tehlikeli madde bildirim süresi ifadesi farklıdır.

GİB e-İrsaliye düzenlemesi belgenin fiili sevkten önce oluşturulması ve sisteme iletilmesi gibi resmi gereksinimler içerir.

**Öneri ve karar:** FlowLogix MVP resmi U-ETDS veya e-İrsaliye entegrasyonu yapmayacak. İleride entegrasyonu engellemeyecek çekirdek taşıma alanları ve belge metadata'sı korunacak. Tehlikeli madde kapsam dışıdır; ADR fazında güncel mevzuat yeniden araştırılacaktır.

### Kaynaklar

- [UAB — Eşya/Tehlikeli Madde Taşımacılığı](https://uetds.uab.gov.tr/esya?PageSpeed=noscript)
- [UAB — U-ETDS İdari Dokümanı](https://uetds.uab.gov.tr/uploads/pages/idari-dokumanlar/u-etds-idari-dokuman.pdf)
- [GİB — 487 Sıra No.lu VUK Genel Tebliği](https://ebelge.gib.gov.tr/dosyalar/tebligler/487_Sira_No.lu_VUK_Genel_Tebligi.pdf)

## R-004 — Olay geçmişi ve dijital pasaport

**Tarih:** 2026-06-28

GS1 EPCIS, görünürlük olaylarını ne, ne zaman, nerede, neden ve nasıl boyutlarıyla tanımlar. Hatalı geçmiş olaylarını silmek yerine düzeltici ek olayla geçmişin açıklanmasını önerir. eFTI ise yetkili taraflara seçici erişim sağlayan sertifikalı platform çerçevesidir ve 9 Temmuz 2027'de tam uygulanacaktır.

**Öneri ve karar:** Shipment timeline append-only yaklaşım kullanacak; EPCIS semantiğinden yararlanacak fakat EPCIS uyumluluğu iddia etmeyecek. Dijital pasaport MVP'de iç kullanıcı görünümüdür; süreli dış link ve QR sonraya bırakıldı. FlowLogix eFTI uyumlu platform olarak tanıtılmayacak.

### Kaynaklar

- [GS1 — EPCIS & CBV](https://www.gs1.org/standards/epcis)
- [GS1 — EPCIS 2.0.1](https://ref.gs1.org/standards/epcis/2.0.1/)
- [Avrupa Komisyonu — eFTI Regulation](https://transport.ec.europa.eu/transport-themes/logistics-and-multimodal-transport/efti-regulation_en)
- [ISO 14083:2023](https://www.iso.org/standard/78864.html)

## R-005 — Kimlik doğrulama ve frontend başlangıcı

**Tarih:** 2026-06-28

Microsoft, browser tabanlı uygulamalarda JavaScript'e token açmayan cookie yaklaşımını önerir. ASP.NET Core 10 cookie kullanan API endpoint'lerinde authentication hatalarını redirect yerine 401/403 olarak döndürür.

Frontend için React 19.2, Vite 8, TypeScript 6, React Router 7 ve TanStack Query 5'in kararlı hatları doğrulandı. React Router 8 çok yeni yayımlandığından ilk MVP'de 7.x hattı daha düşük geçiş riski taşır.

**Öneri ve karar:** Same-origin ASP.NET Core Identity cookie; state-changing isteklerde antiforgery. Frontend exact paket sürümleri kurulum anında doğrulanıp lockfile'a yazılacak.

### Kaynaklar

- [Microsoft — Identity for SPA backends](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-10.0)
- [Microsoft — .NET 10 API cookie behavior](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/api-endpoint-auth?view=aspnetcore-10.0)
- [React versions](https://react.dev/versions)
- [Vite releases](https://vite.dev/releases)
- [TypeScript package](https://www.npmjs.com/package/typescript)
- [TanStack React Query](https://www.npmjs.com/package/%40tanstack/react-query)

## R-006 — Mimari derinlik ve pattern benimseme kapıları

**Tarih:** 2026-06-28  
**Soru:** Sonradan değiştirmemek için Clean Architecture, CQRS, MediatR, repository, event sourcing, outbox ve mikroservislerin hangileri baştan kurulmalı?

### İncelenen seçenekler

1. Başlangıçta tüm enterprise pattern ve altyapıları kurmak
2. Basit katmanlı monolith ile başlayıp sınırları daha sonra oluşturmak
3. Modül sınırlarını baştan kurup her modülün iç karmaşıklığını gerçek davranışa göre artırmak

### Bulgular

- Microsoft, tek deployment birimi olan uygulamaların birçok iç ve küçük/orta ölçekli ürün için uygun olduğunu; buna rağmen sorumlulukların mantıksal olarak ayrılmasının önemli olduğunu belirtiyor.
- Mikroservis bağımsız deployment, veri sahipliği ve bağımsız ölçekleme sağlıyor; karşılığında service discovery, veri tutarlılığı, transaction yönetimi, ağ iletişimi, gözlemlenebilirlik ve operasyon yükü getiriyor. Bu faydalar tek geliştiricili FlowLogix MVP'sinde henüz karşılığı olan ihtiyaçlar değil.
- Microsoft'un microservice sınırı rehberi, sınırların iteratif tasarlanmasını ve şüphede kalındığında daha kaba taneli başlamayı öneriyor. Bu, modüler monolith içinde bounded-context adaylarını ayırıp process sınırını daha sonra seçme yaklaşımını destekliyor.
- Clean Architecture'ın değerli ilkesi iş kurallarının persistence ve framework detaylarından bağımsız olmasıdır. Ancak bunu sağlamak için her modülde katman başına ayrı assembly zorunlu değildir; modül assembly'si, internal görünürlük, bağımlılık kuralları ve testlerle sınır korunabilir.
- Microsoft DDD rehberi, basit CRUD bounded context'lerinde daha sade modelin yeterli olabileceğini; sürekli değişen iş kurallarına sahip context'lerde aggregate/value object gibi zengin modelin yararlı olduğunu açıkça ayırıyor. FlowLogix bu nedenle her modüle aynı mimari ağırlığı uygulamamalı.
- EF Core `DbContext`, kısa ömürlü tek bir unit-of-work için tasarlanmıştır. Bunun üzerine genel bir `IUnitOfWork` ve generic repository eklemek otomatik bir gereksinim değildir.
- EF Core test rehberi repository katmanının güvenilir test double sağladığını, fakat her sorguyu sarmaladığı için önemli geliştirme/bakım maliyeti getirdiğini söylüyor; öncelikli öneri gerçek production veritabanı sistemiyle test etmektir.
- CQRS basit CRUD için gerekli değildir. FlowLogix'te iş niyetini taşıyan write use-case'leri ile DTO/projection döndüren query use-case'leri ayrı tutulabilir; ayrı read database, message queue ve eventual consistency ancak ölçülen ihtiyaçla gelir.
- Event-driven mimari basit request/response akışlarında broker, async hata yönetimi ve eventual consistency maliyetini haklı çıkarmayabilir. Outbox ancak veritabanı değişikliğiyle dış/integration event'in güvenilir biçimde birlikte yayınlanması gerektiğinde anlamlıdır.
- Event sourcing'e geçiş ve event sourcing'den çıkış pahalıdır. Shipment timeline'ın append-only olması, Shipment aggregate'ının event-sourced olması demek değildir.
- MediatR güncel sürümleri yalnız teknik bir paket tercihi değildir: v13 ve sonrası RPL 1.5 veya uygun commercial/community lisans koşullarına tabidir ve license key mekanizması kullanır. Ayrıca MediatR use-case tasarımının kendisi değil, in-process dispatch aracıdır.

### FlowLogix için sonuç

Üçüncü seçenek seçildi: **modüler monolith + modül içinde use-case odaklı dikey dilimler + karmaşık domainlerde seçici DDD**.

Başlangıç uygulama biçimi:

```text
FlowLogix.Api
Modules/
  Customers/
    Domain/
    Features/
      CreateCustomer/
      GetCustomers/
      GetCustomerDetail/
      AddLocation/
    Infrastructure/
    CustomersModule.cs
```

- API yalnız composition root olacak.
- Her bounded-context adayı ayrı module assembly'si olacak.
- Modülün registration/endpoint mapping yüzeyi dışında tipler mümkün olduğunca `internal` tutulacak.
- Domain, EF Core ve ASP.NET Core tiplerine bağımlı olmayacak.
- `Features` içindeki her use-case request/response, validation, handler ve endpoint davranışını birbirine yakın tutacak.
- Basit Customers use-case'lerinde doğrudan modül DbContext'i kullanılabilir; karmaşık aggregate veya gerçek test-double ihtiyacı oluşursa aggregate'e özel repository eklenebilir.
- Write use-case ve read projection ayrımı uygulanacak; buna “tam CQRS altyapısı” denmeyecek.
- Modüller birbirinin tablolarına veya DbContext'ine erişmeyecek. İlk gerçek modüller arası tüketici geldiğinde küçük bir Contracts assembly veya açık application contract oluşturulacak.

### Benimseme kapıları

| Pattern/altyapı | Ekleneceği kanıt |
|---|---|
| Aggregate'e özel repository | Karmaşık aggregate yükleme/saklama politikası veya gerçek test-double ihtiyacı |
| MediatR/başka mediator | Çok sayıda handler için gerçekten ortak pipeline ve dispatch ihtiyacı; lisans yeniden incelenir |
| CQRS read store | Read/write yükü veya şeması ölçülebilir biçimde ayrışır |
| Domain/internal event | Bir iş olayı aynı process içinde birden fazla bağımsız yan etki doğurur |
| Outbox | DB commit ile dış/integration event tesliminin atomik güvenilirliği gerekir |
| Broker | Bağımsız consumer, dayanıklılık veya bağımsız ölçek ihtiyacı oluşur |
| Redis | Ölçülmüş sorgu/latency problemi ve açık invalidation politikası bulunur |
| Mikroservis | Bağımsız deployment/ölçek veya ayrı ekip sahipliği gerçek olur |
| Event sourcing | Geçmişten state yeniden kurma zorunluluğu, geleneksel audit/history'den daha değerli olur |

### Kaynaklar

- [Microsoft — Common web application architectures](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures)
- [Microsoft — Microservices architecture style](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices)
- [Microsoft — Identify microservice boundaries](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/microservice-boundaries)
- [Microsoft — Designing a microservice domain model](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/microservice-domain-model)
- [Microsoft — DbContext lifetime](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)
- [Microsoft — Choosing an EF Core testing strategy](https://learn.microsoft.com/en-us/ef/core/testing/choosing-a-testing-strategy)
- [Microsoft — CQRS pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Microsoft — Event-driven architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)
- [Microsoft — Event Sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
- [Microsoft — Transactional Outbox](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/transactional-out-box-cosmos)
- [MediatR official repository and license](https://github.com/LuckyPennySoftware/MediatR)
- [MediatR official licensing FAQ](https://mediatr.io/)

## R-007 — Clean Architecture, Hexagonal, Onion ve Vertical Slice karşılaştırması

**Tarih:** 2026-06-28  
**Durum:** Tamamlandı

Bu yaklaşımlar aynı seviyede rakip değildir:

| Yaklaşım | Çözdüğü ana problem | FlowLogix için değeri | Yanlış uygulanırsa risk |
|---|---|---|---|
| Modular Monolith | Deployment ve iş alanı sınırları | Tek deploy içinde bağımsız Identity ve Customers modülleri | Yalnız klasörlere ayrılmış “dağınık monolith” |
| Clean Architecture | Bağımlılıkların iş kurallarına doğru yönelmesi | Domain'in ASP.NET Core ve EF Core'dan bağımsız kalması | Proje, interface ve mapping patlaması |
| Hexagonal / Ports and Adapters | Dış dünya ile uygulama sınırı | HTTP, SQL Server ve entegrasyonların adapter olarak görülmesi | Her sınıf için gereksiz port/interface |
| Onion Architecture | Domain merkezli katman bağımlılığı | Clean ile aynı temel bağımlılık ilkesini güçlendirir | Ayrı bir üçüncü klasör sistemi gibi uygulanması |
| Vertical Slice Architecture | Kodun kullanım senaryosuna göre birlikte değişmesi | `CreateCustomer` ve `AddLocation` gibi özelliklerin yerelleşmesi | Modül ve veri sahipliği sınırlarının ihmal edilmesi |
| Tactical DDD | Karmaşık iş kurallarının modellenmesi | İleride sevkiyat ve planlama alanlarında değerli | Basit CRUD'a aggregate/event/repository yükü |

### Araştırma sonucu

- Clean, Onion ve Hexagonal; iş kurallarını UI, framework ve veritabanından koruma fikrinde birleşir. Üç ayrı mimari olarak üst üste kurulmaz.
- Clean Architecture halkaları zorunlu proje veya klasör sayısı değildir; esas olan bağımlılık yönüdür.
- Vertical Slice beraber değişen kodu beraber tutar, ancak sistemin modül ve veri sahipliği sınırlarını tek başına belirlemez.
- EF Core `DbContext` kısa ömürlü bir unit of work'tür. Her erişimi generic repository arkasına almak zorunlu değildir ve ek bakım maliyeti getirir.
- Basit CRUD alanları sade kalabilir; DDD ve CQRS yalnız iş kuralları veya okuma ihtiyaçları gerçekten karmaşıklaştığında eklenmelidir.

### FlowLogix için önerilen birleşim

1. **Sistem seviyesi:** Modular monolith.
2. **Modül sınırları:** Strategic DDD'den bounded-context ve veri sahipliği ilkeleri.
3. **Bağımlılık ilkesi:** Clean/Hexagonal yaklaşımın domain'i dış teknolojilerden koruyan kısmı.
4. **Kod organizasyonu:** Her modül içinde use-case odaklı Vertical Slice.
5. **Domain modelleme:** Yalnız karmaşık kurallarda tactical DDD.
6. **HTTP adapter:** İnce Minimal API endpoint'leri ve modül route group'ları.
7. **Persistence adapter:** Modül başına ayrı EF Core `DbContext`, SQL şeması ve migration geçmişi.

Bu, her modülü Domain/Application/Infrastructure/API olarak dört projeye bölen “tam Clean şablonu” değildir. Modül başına tek assembly içinde görünür sınırlar kullanılacaktır:

```text
FlowLogix.Api
  -> FlowLogix.Identity
  -> FlowLogix.Customers

FlowLogix.Customers
  Domain/
  Features/
    CreateCustomer/
    ListCustomers/
    GetCustomerDetail/
    AddLocation/
  Infrastructure/
  CustomersModule.cs
```

Bir slice'ın akışı:

```text
HTTP Endpoint -> Use-case Handler -> Domain rules -> CustomersDbContext
```

- Endpoint HTTP çevirisi, yetki, request/response ve durum kodlarıyla ilgilenir.
- Handler kullanım senaryosunu ve transaction sınırını yönetir.
- Domain modeli kalıcı iş kurallarını korur; ASP.NET Core ve EF Core tiplerini bilmez.
- Basit handler'lar kendi modül `DbContext`'ini doğrudan kullanabilir. Böylece domain bağımsız kalırken gereksiz repository katmanı oluşmaz.
- Port/interface; dosya depolama, dış servis veya mesajlaşma gibi gerçekten değiştirilebilir dış bağımlılıklar geldiğinde eklenir.
- Bir modül diğerinin tablosuna veya `DbContext`'ine erişmez. Gerçek bir modüller arası tüketici doğduğunda küçük bir contract yüzeyi oluşturulur.

### Neden yalnız Vertical Slice değil?

Vertical Slice bir özelliğin kodunu bir arada tutar; Customers verisinin sahibini ve başka modüllerin tablo erişimini belirlemez. Bu nedenle modular monolith sınırı ve Clean bağımlılık ilkesiyle tamamlanır.

### Neden tam Clean Architecture şablonu değil?

İlk günden her işlem için interface, repository, mapping ve çok sayıda proje üretmek, tek geliştiricili 2–3 aylık MVP'de henüz kanıtlanmamış değişim noktalarına maliyet ödemektir. Domain bağımsızlığı ve veri sahipliği baştan korunur; ek soyutlamalar ihtiyaç kanıtlandığında eklenir.

### Yeniden değerlendirme kapıları

- Domain kuralları ciddi biçimde büyürse Domain ve Application ayrı assembly'lere çıkarılabilir.
- MVC filter, convention veya gelişmiş model binding ihtiyacı oluşursa controller yaklaşımı değerlendirilebilir.
- Ölçülmüş farklı okuma modeli ihtiyacı oluşursa CQRS read model değerlendirilebilir.
- Harici sisteme güvenilir asenkron teslimat gerektiğinde domain event ve outbox değerlendirilir.
- Modül ihlali riski büyüdüğünde architecture test eklenir.

### Kaynaklar

- [Microsoft — Common web application architectures](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures)
- [Robert C. Martin — The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Alistair Cockburn — Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture)
- [Jeffrey Palermo — The Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
- [Jimmy Bogard — Vertical Slice Architecture](https://www.jimmybogard.com/vertical-slice-architecture/)
- [Microsoft — Clean Architecture, Vertical Slices and Modular Monoliths](https://learn.microsoft.com/en-us/shows/on-dotnet/on-dotnet-live-clean-architecture-vertical-slices-and-modular-monoliths-oh-my)
- [Microsoft — Minimal APIs overview](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/apis?view=aspnetcore-10.0)
- [Microsoft — EF Core testing strategy](https://learn.microsoft.com/en-us/ef/core/testing/choosing-a-testing-strategy)
- [Microsoft — CQRS pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Microsoft — Designing a DDD-oriented model](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/microservice-domain-model)

## Sonraki araştırma kapıları

- Sipariş taskı öncesi yük birimi ve temel çoklu durak davranışı
- Fleet taskı öncesi araç/sürücü belge türleri ve hard/soft uygunluk politikası
- Execution taskı öncesi POD ve kısmi/ret teslimat davranışı
- Finance readiness öncesi gelir/maliyet kalemleri ve marj eşikleri
- Gerçek müşteri kullanımı öncesi KVKK, belge saklama ve erişim politikası

## R-008 — Kodlamaya başlamadan önce mimari hazırlık boşlukları

**Tarih:** 2026-06-28  
**Durum:** Tamamlandı; önerilerin tamamı kullanıcı tarafından onaylandı

Amaç her olası teknik kararı peşinen vermek değil, sonradan değiştirilmesi pahalı kararları erken; yerel ve geri alınabilir kararları ihtiyaç anında vermektir.

### 1. FLOW-001 iskeletinde kurulması önerilen temel

| Konu | Öneri | Gerekçe |
|---|---|---|
| SDK | `global.json` ile .NET 10 feature band sabitleme ve yalnız patch roll-forward | Geliştirici/CI farkını azaltır |
| Ortak build kuralları | Kök `Directory.Build.props`: nullable, implicit usings, built-in analyzers, build'de code style ve warning politikası | Kuralların projeler arasında sessizce ayrışmasını önler |
| NuGet sürümleri | Kök `Directory.Packages.props` ile Central Package Management ve exact doğrudan paket sürümleri | Çok projeli solution'da sürüm yönetimini tek noktaya taşır |
| Kod biçimi | Kök `.editorconfig` | IDE'den bağımsız, görünür biçim ve adlandırma kuralları sağlar |
| API keşfi | ASP.NET Core'un birinci taraf OpenAPI üretimi; yalnız Development'ta belge endpoint'i | API sözleşmesini erken görünür yapar; ayrıca Swagger UI paketi zorunlu değildir |
| Hata sınırı | Composition root'ta `AddProblemDetails`, exception handling ve status-code davranışı | Modüllerin farklı hata gövdeleri üretmesini önler |
| Frontend organizasyonu | React tarafında teknik klasör yığını yerine `features/auth`, `features/customers` ve küçük ortak `app`/`shared` alanları | Backend Vertical Slice yaklaşımıyla aynı değişim eksenini korur |

`TreatWarningsAsErrors` ilk boş iskeletten itibaren uygulanabilir; fakat style/analyzer kural seti bir defada “all” seviyesine çıkarılmamalıdır. SDK güncellemelerinde yüzlerce yeni uyarı üretmemek için seçili, açıklanabilir bir başlangıç seviyesi kullanılmalıdır.

### 2. FLOW-002/003 öncesinde netleşmesi gereken veri kuralları

#### Teknik kimlik

İlk değerlendirmede .NET 10 `Guid.CreateVersion7()` düşünüldü; SQL Server özelinde yapılan ek doğrulama sonucunda bu öneri geri çekildi. SQL Server `uniqueidentifier` değerlerini RFC byte sırasıyla karşılaştırmaz; son altı byte karşılaştırmada daha önemlidir. Bu nedenle UUID v7'nin genel zaman sırası, SQL Server clustered index sırası için otomatik olarak “optimal sequential GUID” anlamına gelmez.

FlowLogix için iki makul seçenek:

| Seçenek | Artı | Eksi |
|---|---|---|
| SQL Server `bigint identity` | En sade ve küçük clustered key | ID insert'ten sonra oluşur; tahmin edilebilir teknik ID |
| EF Core SQL Server provider'ın varsayılan sequential `Guid` üretimi | Dağıtık koordinasyon gerektirmez; SQL Server index düzenine göre optimize edilir | `bigint`ten daha geniştir; entity track edildiğinde üretilir |

Öneri: teknik kimlik tipi `Guid` kalsın, fakat elle UUID v7 üretmek yerine SQL Server provider'ın `ValueGeneratedOnAdd` için varsayılan `SequentialGuidValueGenerator` davranışı kullanılsın. Kimlik iş anlamı taşımaz; müşteri kodu gibi business key'ler ayrıca benzersiz olur. ID'den oluşturulma zamanı türetilmez.

#### Zaman

Öneri: olay anları ve audit alanları `DateTimeOffset` olarak, sıfır UTC offset ile saklansın; saat üretimi doğrudan `DateTime.Now` yerine DI'daki `TimeProvider` üzerinden yapılsın.

- Tek bir anı belirsiz `DateTimeKind` davranışı olmadan temsil eder.
- Testlerde zamanı kontrol etmeyi kolaylaştırır.
- `Europe/Istanbul` yalnız kullanıcıya gösterim ve yerel planlama girdisinin yorumlanması için kullanılır.
- “08:30 yükleme randevusu” gibi yerel takvim değerleri ileride yalnız UTC timestamp'e indirgenmeden ayrıca saat dilimi bağlamıyla modellenmelidir.

#### Audit aktörü

Mevcut plan yalnız UTC audit zamanlarını zorunlu kılıyor. ERP izlenebilirliği için öneri:

- `CreatedAtUtc`, `CreatedByUserId`
- `LastModifiedAtUtc`, `LastModifiedByUserId`

Identity modülüne foreign key kurulmaz; kullanıcı ID'si scalar snapshot/reference olarak saklanır. Böylece Customers, Identity tablosunun persistence ayrıntısına bağlanmaz. Bu ek alan ürün kapsamı onayı gerektirir.

#### Concurrency

- Create yarışlarında uygulama ön-kontrolü yeterli değildir; asıl güvence SQL unique constraint ve duplicate key'in `409`'a çevrilmesidir.
- `rowversion`, ilk update endpoint'i geldiğinde mutable aggregate root'a eklenmelidir.
- Henüz update use case'i yokken her tabloya concurrency token koymak gerekli değildir.

#### Transaction

İlk dilimde her command tek modül `DbContext` ve tek `SaveChangesAsync` kullanmalıdır. EF Core bunu varsayılan olarak transaction içinde atomik uygular. Elle transaction yalnız bir use case birden fazla `SaveChanges`, context veya veri erişim tekniğini atomik koordine etmek zorunda kalırsa eklenmelidir.

### 3. İlk migration'dan önce uygulanacak sahiplik kuralları

- Identity ve Customers migration'ları kendi modül projelerinde tutulur.
- Her `DbContext`, kendi şemasında ayrı migration history tablosu kullanır.
- Migration production startup'ında otomatik uygulanmaz; deployment adımı olarak açıkça çalıştırılır ve SQL'i incelenir.
- Development ve integration test database adları ayrıdır.
- Connection string repository'ye girmez.

### 4. İlk integration testinden önce netleştirilecekler

- Testler SQL Server provider davranışını doğrulamalı; EF InMemory ana persistence testi olmamalıdır.
- İlk küçük suite için bir test çalıştırmasına özel database, migration-at-start ve seri çalışan integration testleri yeterlidir.
- Suite büyürse güvenli reset aracı veya test başına izolasyon ölçülerek seçilir; başlangıçtan ağır container/orchestration kurulmaz.
- Architecture testi ilk iki gerçek modül kodu oluştuğunda eklenir. Önce korunacak gerçek namespace/reference kuralı görülmelidir.

### 5. Deployment hedefi belli olduğunda verilecek kararlar

Aşağıdakiler iskeleti bloke etmez:

- IIS, container veya bulut hosting seçimi
- ASP.NET Core Data Protection key ring'in kalıcı ve şifreli saklanacağı yer
- Reverse proxy ve forwarded headers
- Production HTTPS/HSTS, backup ve restore provası
- Merkezi log/metric/trace sağlayıcısı

Cookie'ler Data Protection anahtarlarıyla korunur. Tek process development varsayılanı başlangıç için yeterlidir; deployment'ta anahtarların process/container ömrüyle kaybolması kullanıcı oturumlarını geçersiz kılacağından hosting hedefi seçildiğinde ayrıca tasarlanmalıdır.

### 6. Şimdilik eklenmemesi gerekenler

- API versioning: yalnız bir first-party web client ve yayınlanmış public API yok.
- Swagger UI için ek paket: OpenAPI JSON başlangıçta yeterli.
- Global distributed transaction veya cross-module Unit of Work.
- Her entity için base class, generic audit interceptor veya generic repository.
- Docker/Aspire/Testcontainers: yerel SQL Server ve mevcut MVP akışı bunları henüz gerektirmiyor.
- OpenTelemetry backend/exporter: önce anlamlı log olayları ve deployment hedefi oluşmalı.

### Onaylanan sonuçlar

1. FLOW-001 iskeletinde `global.json`, `Directory.Build.props`, `Directory.Packages.props`, `.editorconfig`, first-party OpenAPI ve ortak Problem Details temelinin birlikte kurulması.
2. Entity teknik kimliklerinde EF Core SQL Server'a optimize sequential `Guid`; audit/olay anlarında UTC `DateTimeOffset` + `TimeProvider` kullanılması.
3. Customer ve Location için kullanıcı kimliğini taşıyan created/last-modified audit alanlarının MVP'ye alınması.
4. İlk yerel yeşil build'den sonra GitHub Actions ile restore/build/test/frontend build kontrolünün FLOW-001 kapsamına eklenmesi.

**Onay:** Kullanıcı 2026-06-28 tarihinde `1A, 2A, 3A, 4A` seçeneklerini onayladı. Kararlar D-012, D-013 ve D-014'e işlendi.

### Kaynaklar

- [Microsoft — Central Package Management](https://learn.microsoft.com/en-us/nuget/consume-packages/central-package-management)
- [Microsoft — MSBuild properties for Microsoft.NET.Sdk](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/msbuild-props)
- [Microsoft — OpenAPI support in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/overview?view=aspnetcore-10.0)
- [Microsoft — Handle errors in ASP.NET Core APIs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/error-handling-api?view=aspnetcore-10.0)
- [Microsoft — EF Core generated values](https://learn.microsoft.com/en-us/ef/core/modeling/generated-properties)
- [Microsoft — SequentialGuidValueGenerator](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.valuegeneration.sequentialguidvaluegenerator?view=efcore-10.0)
- [Microsoft — SQL Server GUID comparison behavior](https://learn.microsoft.com/en-us/sql/connect/ado-net/sql/compare-guid-uniqueidentifier-values?view=sql-server-ver17)
- [Microsoft — Date and time guidance](https://learn.microsoft.com/en-us/dotnet/standard/datetime/choosing-between-datetime)
- [Microsoft — EF Core concurrency](https://learn.microsoft.com/en-us/ef/core/saving/concurrency)
- [Microsoft — EF Core transactions](https://learn.microsoft.com/en-us/ef/core/saving/transactions)
- [Microsoft — Custom migrations history table](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/history-table)
- [Microsoft — ASP.NET Core Data Protection configuration](https://learn.microsoft.com/en-us/aspnet/core/security/data-protection/configuration/overview?view=aspnetcore-10.0)

## R-009 — .NET test framework ve test platformu seçimi

**Tarih:** 2026-06-28  
**Durum:** Tamamlandı

Test framework, testlerin attribute/assertion modelini; test platformu ise keşif ve çalıştırma motorunu belirler. Bunlar aynı karar değildir.

| Seçenek | Güçlü taraf | FlowLogix açısından maliyet |
|---|---|---|
| MSTest SDK + Microsoft.Testing.Platform | Microsoft tarafından güncel .NET için önerilen SDK stili; platform ve extension sürümlerini hizalar; .NET 10 `dotnet test` desteği | xUnit'e göre attribute'ları biraz daha açık/uzun |
| xUnit v3 + Microsoft.Testing.Platform | Güçlü fixture modeli, ASP.NET Core örneklerinde yaygın kullanım | v3/MTP hattı hızlı gelişiyor; runner ve IDE/üçüncü taraf uyumu daha dikkatli yönetilmeli |
| VSTest tabanlı geleneksel şablon | En geniş eski araç uyumluluğu | Yeni projede modern MTP hattının avantajlarını kullanmaz |

Öneri: bütün .NET test projelerinde **MSTest SDK + Microsoft.Testing.Platform** kullanmak. Unit ve integration projeleri aynı platformu kullanmalı; VSTest ve MTP projeleri aynı solution koşusunda karıştırılmamalıdır.

İlk şablon yerel .NET SDK'dan `MSTest.Sdk/4.0.2` üretti. Güncel Microsoft rehberi ve NuGet kaydı `4.1.0` sürümünü doğruladığı için FlowLogix `global.json` içindeki `msbuild-sdks` alanında `MSTest.Sdk` sürümünü `4.1.0` olarak merkezileştirecektir. .NET 10 `dotnet test` MTP modu da `global.json` içindeki `test.runner` ile açıkça seçilecektir.

Bu seçim test kapsamını değiştirmez:

- Saf domain kuralları unit test edilir.
- SQL Server, migration, transaction ve auth davranışları integration test edilir.
- Kritik browser akışı E2E olarak ayrı ele alınır.

### Kaynaklar

- [Microsoft — Test platforms overview](https://learn.microsoft.com/en-us/dotnet/core/testing/test-platforms-overview)
- [Microsoft — Run tests with MSTest](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-mstest-running-tests)
- [Microsoft — Write tests with MSTest](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-mstest-writing-tests)
- [Microsoft — ASP.NET Core integration tests](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-10.0)
- [xUnit — Microsoft Testing Platform](https://xunit.net/docs/getting-started/v3/microsoft-testing-platform)
- [Microsoft — Reference an MSBuild Project SDK](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-project-sdk?view=visualstudio)
- [NuGet — MSTest.Sdk 4.1.0](https://www.nuget.org/packages/MSTest.Sdk/4.1.0)
- [Microsoft — `dotnet test`](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test)

## R-010 — Modül endpoint sahipliği ve ASP.NET Core framework reference

**Tarih:** 2026-06-29  
**Durum:** Tamamlandı

FlowLogix'in onaylanan yapısında her modül tek assembly içinde `Domain`, `Features`, `Infrastructure` ve `Endpoints` alanlarını taşır. Bu nedenle endpoint adapter'ları ve service-registration extension'ları ASP.NET Core API'lerine erişmek zorundadır.

| Seçenek | Artı | Eksi | Sonuç |
|---|---|---|---|
| Modül class library'sine `Microsoft.AspNetCore.App` framework reference | Endpoint ve DI kayıtları modülün sahibi olduğu assembly'de kalır; ek NuGet paketleri gerekmez | Aynı assembly'deki Domain kodunun framework tipi kullanmasını compile-time engellemez | Seçildi |
| Endpoint'leri `FlowLogix.Api` içine taşımak | Modül assembly'si framework referansı almaz | API büyür, feature sahipliği ve modül kapsülleme zayıflar | Reddedildi |
| Her modül için ayrı Domain/Application/Infrastructure/Endpoints projeleri | En güçlü compile-time katman izolasyonu | D-011'de seçilmeyen proje/contract/mapping yükünü getirir | Şimdilik reddedildi; kanıtlanmış ihtiyaçta yeniden değerlendirilir |
| Yalnız tekil ASP.NET abstraction paketleri eklemek | Daha dar görünen bağımlılık | ASP.NET Core server API'lerinin çoğu shared framework'tedir; paket parçalama gerçek domain izolasyonu sağlamaz | Reddedildi |

Microsoft, `Microsoft.NET.Sdk` kullanan ve ASP.NET Core API'lerine ihtiyaç duyan class library'ler için `FrameworkReference Include="Microsoft.AspNetCore.App"` kullanımını resmi olarak destekler. Bu bir NuGet `PackageReference` değildir; hedef makinedeki shared framework'e bağlanır.

### 2026-06-29 alternatifler için ek değerlendirme

“HTTP sunan modülün bir yerinde ASP.NET Core bulunmalıdır” ifadesi host düzeyinde doğrudur; fakat modülün Domain assembly'sinin framework reference alması zorunlu değildir. Endpoint'ler ayrı bir Presentation projesine taşınırsa ASP.NET Core yalnız dış katmanda kalabilir. Bu, compile-time izolasyonu güçlendirir; karşılığında her modül için daha fazla proje, proje referansı, public contract ve mapping yüzeyi doğurur. `Domain + Application + Presentation` ayrımı ayrıca MediatR veya tam CQRS kullanmayı zorunlu kılmaz.

FlowLogix için seçenekler yeniden karşılaştırıldığında:

| Yaklaşım | Çözdüğü problem | FlowLogix kararı |
|---|---|---|
| Modül başına tek assembly + klasör/namespace sınırı | Düşük operasyonel maliyetle feature sahipliği ve tek deployment | Şimdi devam |
| Ayrı Domain/Application/Presentation projeleri | Katman bağımlılığını derleyici seviyesinde engellemek | Somut ihlal veya artan domain karmaşıklığında yeniden değerlendir |
| gRPC + `.proto` | Ayrı süreçler/diller arasında tipli senkron RPC | Composition-root veya aynı süreçteki modül izolasyonunun alternatifi değil |
| Broker/event-driven iletişim | Ayrı süreçler ya da bounded context'ler arasında asenkron yayılım ve eventual consistency | FLOW-001 ihtiyacı değil; bağımsız süreç/entegrasyon ihtiyacında değerlendir |
| Minimal API / REPR | HTTP adapter'ını ince ve use-case odaklı tutmak | Built-in Minimal API + vertical slice ile uygulanacak |
| FastEndpoints benzeri üçüncü taraf endpoint framework'ü | REPR convention ve ek endpoint altyapısı sağlamak | Built-in Minimal API yetersizliği kanıtlanmadan paket eklenmeyecek |

Buradaki `Add...Module` ve `Map...Endpoints` metotları modüllerin birbirleriyle konuştuğu iş kontratı değildir. Bunlar aynı process içindeki API host'unun modülü başlatması için composition-root sözleşmesidir. gRPC veya broker kullanmak bu başlangıç sözleşmesini ortadan kaldırmaz; yalnız süreçler arası iş iletişiminin protokolünü değiştirir. ASP.NET Core gRPC sunucusu da ASP.NET Core üzerinde çalışır, `Grpc.AspNetCore` paketi ve HTTP/2 gerektirir.

**Benimseme kapısı:** Domain kodunda ASP.NET Core/EF Core kullanım ihlali görülmesi, modülün bağımsız yeniden kullanılması gerekmesi, modül başına ekip sahipliği oluşması veya Customers/Shipment domaininin tek assembly sınırında güvenilir biçimde korunamaması hâlinde önce ilgili modül için fiziksel proje ayrımı değerlendirilir. Bütün modüller sırf simetri için aynı anda bölünmez.

### Uygulama sınırı

- Framework reference yalnız modül kayıt ve endpoint adapter ihtiyacı nedeniyle eklenir.
- Domain source dosyaları ASP.NET Core ve EF Core namespace/type kullanmaz.
- API composition root modüllerin yalnız public kayıt/eşleme metotlarını çağırır.
- Modüller birbirine project reference vermez.
- Gerçek domain tipleri oluştuğunda namespace/dependency architecture testi yeniden değerlendirilir.

### Kaynaklar

- [Microsoft — Use ASP.NET Core APIs in a class library](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/target-aspnetcore?view=aspnetcore-10.0)
- [Microsoft — Minimal APIs; endpoints outside Program.cs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-10.0)
- [Microsoft — gRPC services with ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/grpc/aspnetcore?view=aspnetcore-10.0)
- [Microsoft — Asynchronous message-based communication](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/asynchronous-message-based-communication)
- [Microsoft — Common web application architectures](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures)

## R-011 — Modül karakterine göre pattern ve mimari evrim haritası

**Tarih:** 2026-06-29  
**Durum:** Tamamlandı

Word ürün referansı bütün modüllerin aynı iş karakterine sahip olmadığını gösterir: Customers ana veri, Orders ticari yaşam döngüsü, Shipments fiziksel operasyon ve durum geçişi, Exceptions kural/vaka yönetimi, Reporting ise cross-module okuma modelidir. Bu nedenle standart dış sınırlar korunurken iç pattern yoğunluğu modülün gerçek karmaşıklığına göre değişmelidir.

Microsoft'un DDD rehberi de önemli iş karmaşıklığında aggregate ve her zaman geçerli domain modeli önerirken, basit alt alanların CRUD/transaction-script düzeyinde kalabileceğini kabul eder. Pattern çeşitliliği öğrenme hedefidir; fakat bir modüle sırf farklı bir pattern göstermek için gereksiz altyapı eklenmez.

### Bütün modüller için değişmez omurga

1. Tek ASP.NET Core host ve modüler monolith deployment.
2. Modül başına veri sahipliği, SQL şeması, `DbContext` ve migration geçmişi.
3. `Add...Module` ve `Map...Endpoints` public composition yüzeyi.
4. İnce Minimal API adapter'ı ve use-case bazlı vertical slice.
5. API request/response, domain davranışı ve EF configuration sorumluluklarının ayrılması.
6. Modüller arası doğrudan `DbContext`/tablo erişimi yerine açık application/read contract.
7. Yetkinin endpoint adıyla değil policy ve use-case niyetiyle kontrol edilmesi.
8. Transaction sınırının use-case bazında açık olması; tek `SaveChanges` yeterliyse ek Unit of Work abstraction'ı kurulmaması.
9. Domain kuralında unit, SQL/transaction/auth davranışında integration, kritik uçtan uca akışta E2E test.
10. Domain event, process içi application event ve dış integration event kavramlarının teslimat/transaction davranışı belirtilmeden birbirinin yerine kullanılmaması.

### MVP modülleri için önerilen pattern yoğunluğu

| Modül | İş karakteri | Şimdi kullanılacak yaklaşım | Bilinçli olarak şimdi kullanılmayacak |
|---|---|---|---|
| Identity | Framework ve güvenlik politikası ağırlıklı | ASP.NET Core Identity, cookie/antiforgery, policy-based authorization, ince auth endpointleri | Özel auth protokolü, zengin DDD modeli, ayrı identity servisi |
| Customers | Ana veri ve doğrulama ağırlıklı | Sade vertical slice, entity/value doğrulamaları, EF Core doğrudan use-case kullanımı, DB unique constraint | Generic repository, mediator, ağır aggregate/event modeli |
| Fleet | Kaynak uygunluğu ve tarih aralığı kuralları | Entity invariants, uygunluk policy/domain service, açık çakışma sorguları, gerektiğinde concurrency token | Genel amaçlı rules engine, her kural için zorunlu class hiyerarşisi |
| Orders | Ticari yaşam döngüsü ve para kuralları | Aggregate root, `Money` benzeri value object, isimlendirilmiş davranış metotları, açık geçiş tablosu, optimistic concurrency | Her durum için State Pattern sınıfı, tam CQRS altyapısı |
| Shipments | Planlama, atama, execution ve güçlü durum kuralları | Daha zengin domain model, aggregate sınırı, explicit state transitions, append-only `ShipmentEvent` timeline, transaction/concurrency değerlendirmesi | Event sourcing, saga/process manager ve broker |
| Documents/POD | Metadata ile dosya saklama adapter'ının ayrılması | Storage port/adapter, SQL'de metadata, belge sürümü/düzeltme ve tamlık politikası | Storage sağlayıcısı belli olmadan cloud bağımlılığı; timeline'ı dosya tablosundan türetmek |
| Exceptions | Kural sonucu oluşan, sahiplenilen ve çözülen vaka | `ExceptionCase` yaşam döngüsü, küçük policy/rule kataloğu, kanıt snapshot'ı; kural sayısı arttığında Strategy benzeri ayrı değerlendiriciler | Dinamik DSL/genel rules engine |
| Billing Readiness | Birden çok modül özetinden türetilen karar | Saf readiness/calculation policy, açık read contract/projection, sonuç gerekçelerinin saklanması | Orders/Shipments tablolarına sahiplik dışı yazma veya rastgele cross-module join |
| Reporting | Okuma, toplama ve performans ağırlıklı | CQRS'nin yalnız read-side ayrımı, projection/read model, ölçülmüş ihtiyaca göre optimize SQL | Rapor için domain aggregate yüklemek; baştan ayrı analytics database |
| Notifications/Jobs | İşlem sonrası yan etki ve zamanlanmış kontrol | Process içi event tüketimi, `BackgroundService`/job adapter'ı, idempotent handler; iş kuralı kaynak modülde kalır | MVP başında broker, dağıtık scheduler veya notification modülüne domain kararları taşımak |

`Orders` ve `Shipments` için “state machine” öncelikle enum + izin verilen geçiş tablosu + isimlendirilmiş domain metotları anlamına gelir. Ayrı State Pattern sınıfları yalnız durum başına davranış belirgin biçimde büyürse değerlendirilir. `ShipmentEvent` geçmişi koruyan append-only timeline'dır; sistemin tüm durumunu event replay ile üretmediği sürece event sourcing değildir.

### Sonraki sürümlerde öğrenme ve benimseme kapıları

| Sürüm/yön | Uygun teknik öğrenme | Benimseme koşulu |
|---|---|---|
| v0.2 tedarikçi/taşeron | Yeni bounded context, contract ve maliyet politikası | Gerçek dış kaynak taşıma akışı onaylanırsa |
| v0.3 depo/stok | Inventory ledger, barcode adapter, concurrency | Fiziksel stok hareketi kapsamı doğrulanırsa |
| v0.4 CRM/fiyatlandırma | Versioned pricing, Strategy/policy ve workflow | Fiyatların tarihsel/geçerlilik bazlı değişmesi gerekirse |
| v0.5 finans entegrasyonu | Anti-corruption adapter, idempotency, transactional outbox | DB commit sonrası harici sisteme güvenilir teslimat gerekirse |
| v0.6 portal/public API | API versioning, rate limiting, contract testing | Kurum dışı tüketiciler oluşursa |
| v0.7 sürücü PWA | Offline-first sync, conflict resolution, realtime | Saha kullanıcısı ve bağlantısız çalışma doğrulanırsa |
| v1.0 SaaS | Tenant isolation, observability ve deployment politikası | Birden fazla bağımsız müşteri şirket aynı ürünü kullanacaksa |
| Daha sonra servis ayrıştırma | Broker, distributed tracing, eventual consistency, saga gereksinimi | Bağımsız deployment/ölçek, hata izolasyonu veya ayrı ekip sahipliği ölçülebilir hâle gelirse |

### Event ve mikroservis evrim yolu

1. **Başlangıç:** Aynı use-case içindeki zorunlu tutarlılık doğrudan çağrı ve aynı SQL transaction'ı ile korunur.
2. **Process içi event:** Aynı process'te birden fazla bağımsız yan etki oluştuğunda domain/application event kullanılır; event'in commit öncesi/sonrası davranışı açıkça seçilir.
3. **Transactional outbox:** DB commit'i başarılı olduktan sonra kaybolmaması gereken entegrasyon olayı oluştuğunda business değişikliği ve outbox kaydı aynı transaction'a yazılır.
4. **Broker:** Bağımsız tüketici, retry, ölçek veya process ayrımı oluştuğunda outbox publisher mesajı broker'a gönderir; tüketiciler idempotent olur.
5. **Mikroservis:** Yalnız bağımsız deployment ve veri sahipliği gerçek değer sağladığında ilgili bounded context ayrı process/veritabanına çıkarılır.

Bu sıra modüler monolith'i “atılacak geçici kod” yapmaz. Bugün kurulan veri sahipliği, modül contract'ı ve event anlamı gelecekte servis sınırına dönüşebilir; fakat process ayrıldığında ağ hatası, gecikme, duplicate mesaj, eventual consistency ve dağıtık gözlemlenebilirlik ayrıca tasarlanır.

### Kaynaklar

- [FlowLogix kapsamlı ürün/domain Word belgesi — Bölüm 4, 6, 8 ve 9](../FlowLogix_Kapsamli_Proje_Planlama_ve_Agent_Rehberi.docx)
- [Microsoft — Designing a DDD-oriented microservice](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)
- [Microsoft — Domain events: design and implementation](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-events-design-implementation)
- [Microsoft — EF Core transactions](https://learn.microsoft.com/en-us/ef/core/saving/transactions)
- [Microsoft — EF Core optimistic concurrency](https://learn.microsoft.com/en-us/ef/core/saving/concurrency)
- [Microsoft — ASP.NET Core policy-based authorization](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/policies?view=aspnetcore-10.0)
- [Microsoft — Background tasks with hosted services](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/host/hosted-services?view=aspnetcore-10.0)
- [Microsoft — Integration events and eventual consistency](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/integration-event-based-microservice-communications)
- [Microsoft — Azure architecture styles and microservices trade-offs](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/)
- [Microsoft — Identify microservice boundaries](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/microservice-boundaries)
