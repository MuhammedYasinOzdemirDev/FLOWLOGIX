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

## R-012 — GitHub Actions, SonarQube ve kalite kapısı stratejisi

**Tarih:** 2026-06-29  
**Durum:** Tamamlandı

FlowLogix repository'sinin GitHub API üzerinden public olduğu doğrulandı. Amaç, yerelde kullanılan restore/build/test/frontend komutlarını güvenli ve tekrarlanabilir bir remote kapıya taşımak; statik analizi gerçek test kapsamı veya dil uyumluluğu varmış gibi göstermemektir.

### Seçenek karşılaştırması

| Seçenek | Sağladığı değer | Maliyet/risk | Sonuç |
|---|---|---|---|
| GitHub Actions | PR ve `main` push üzerinde build/test/lint doğrulaması | Workflow ve action sürüm bakımı | FLOW-001 kapsamında zorunlu |
| SonarQube Cloud Free | C#/JS/TS code quality, security analizi ve quality gate; public repo için sunucu bakımı yok | GitHub bağlantısı ve `SONAR_TOKEN`; Free plan branch/PR özellikleri sınırlı | Önerildi |
| Self-hosted SonarQube Server | Veri ve sunucu kontrolü | Sunucu, DB, upgrade, backup, TLS ve erişim güvenliği yükü | Tek geliştirici/public repo için reddedildi |
| GitHub CodeQL | GitHub-native güvenlik/code scanning | Sonar ile kısmi örtüşme; code-quality odağı daha dar | İleride güvenlik ihtiyacında tamamlayıcı |
| Yalnız .NET analyzer/ESLint | Hızlı, local ve secretsız | Cross-language dashboard/quality gate yok | CI'nın temel katmanı; Sonar'ın yerine değil önünde |

SonarQube Cloud Free plan public projeleri destekler ve private projelerde toplam 50k LOC sınırı sunar. FlowLogix public olduğu için ücretli ya da self-hosted sunucu bugün gerekmez. Sonar bağlantısı dış hizmet/account işlemi olduğu için repository import'u ve secret oluşturma kullanıcı tarafından yapılmalıdır.

### GitHub Actions tasarım sınırı

- Workflow frontend scaffold ve lockfile oluştuktan sonra yazılacak; yarım workflow commit edilmeyecek.
- Tetikleyiciler `pull_request` ve yalnız `main` push olacak; `pull_request_target` kullanılmayacak.
- `permissions: contents: read` varsayılanı kullanılacak; workflow repository'ye yazmayacak.
- `actions/checkout` ve setup action'ları mümkünse doğrulanmış full commit SHA'ya pinlenecek; okunabilirlik için yanına sürüm yorumu yazılacak.
- `global.json` içindeki .NET `10.0.301` politikası kullanılacak. GitHub'ın güncel hatları `actions/checkout@v6` ve `actions/setup-dotnet@v5`tir; gerçek SHA workflow yazılırken resmi repository'den tekrar doğrulanacak.
- Backend kapısı `restore → Release build --no-restore → test --no-build --no-restore`; frontend kapısı `npm ci → lint → test → build` olacak.
- NuGet cache, `packages.lock.json` oluşmadan açılmayacak. Küçük dependency graph'ta cache'in faydası ölçülmeden ek karmaşıklık oluşturulmayacak.
- `concurrency` ile aynı branch/PR'ın eski koşusu iptal edilecek.
- Gerçek SQL Server integration testleri başladığında GitHub-hosted runner üzerinde SQL Server service/container stratejisi ayrıca doğrulanacak; bugünkü iki boş keşif testi SQL entegrasyonu sayılmayacak.
- İlk başarılı remote koşu görülmeden branch protection/required check adı sabitlenmeyecek.

### SonarQube Cloud aşamalı kurulum

1. Kullanıcı GitHub hesabıyla SonarQube Cloud organization/project oluşturur veya public repository'yi import eder.
2. Üretilen token GitHub repository secret olarak yalnız `SONAR_TOKEN` adıyla saklanır; YAML veya appsettings'e yazılmaz.
3. SonarScanner for .NET repository local tool manifest'inde exact sürüme sabitlenir.
4. CI-based analiz `begin → restore/build/test → end` sırasını kullanır ve checkout geçmişi analiz için tam alınır.
5. Quality gate başlangıçta analiz görünürlüğü sağlar; iki boş şablon testinden coverage hedefi türetilmez.
6. Gerçek unit/integration testleri oluştuğunda `dotnet-coverage` veya Coverlet karşılaştırılır, coverage raporu üretilip Sonar'a import edilir.

### TypeScript 6 uyumluluk kapısı

TypeScript `6.0.3` güncel kararlı sürümdür. Buna karşılık SonarQube Cloud'un 2026-06-29 tarihli JavaScript/TypeScript dokümanı tam desteği `5.9.3`e kadar bildirir. TypeScript 6, Microsoft tarafından 5.9 ile API uyumlu bir geçiş sürümü olarak tanımlansa da bu Sonar desteğini varsaymak için yeterli değildir.

Öneri: FlowLogix'i yalnız analiz aracı geride kaldığı için TypeScript 5.9'a düşürmemek. İlk Sonar adımında `sonar.scanner.scanAll=false` ile C# kapsamını güvenilir tutmak; Sonar TypeScript 6 desteği açıkça doğrulandığında multi-language taramayı ve frontend coverage'ını etkinleştirmek. Yarınki frontend sürüm kararı bu uyumluluk notuyla birlikte tekrar değerlendirilecek.

### Kaynaklar

- [GitHub — Building and testing .NET](https://docs.github.com/en/actions/tutorials/build-and-test-code/net)
- [GitHub — Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)
- [GitHub — `actions/checkout`](https://github.com/actions/checkout)
- [GitHub — `actions/setup-dotnet`](https://github.com/actions/setup-dotnet)
- [GitHub — Dependabot version updates](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-version-updates)
- [Sonar — SonarQube Cloud subscription plans](https://docs.sonarsource.com/sonarqube-cloud/administering-sonarcloud/managing-subscription/subscription-plans)
- [Sonar — GitHub Actions CI-based analysis](https://docs.sonarsource.com/sonarcloud/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud)
- [Sonar — SonarScanner for .NET configuration and multi-language analysis](https://docs.sonarsource.com/sonarqube-cloud/advanced-setup/ci-based-analysis/sonarscanner-for-dotnet/configuring)
- [Sonar — .NET test coverage](https://docs.sonarsource.com/sonarqube-cloud/enriching/test-coverage/dotnet-test-coverage)
- [Sonar — JavaScript/TypeScript/CSS support](https://docs.sonarsource.com/sonarqube-cloud/advanced-setup/languages/javascript-typescript-css)
- [Microsoft — Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)
- [npm — TypeScript](https://www.npmjs.com/package/typescript)

## R-013 — Frontend foundation sürüm ve araç seçimi

**Tarih:** 2026-06-29
**Durum:** Tamamlandı

FlowLogix frontend'i aynı origin ASP.NET Core API'yi kullanan, server-state ağırlıklı bir operasyon SPA'sıdır. Bu nedenle SSR/full-stack React framework'ü yerine Vite SPA; route için React Router; API cache/senkronizasyonu için TanStack Query seçildi. Paket metadata'sı npm registry'den `strict-ssl=true` korunarak doğrulandı.

### Seçilen başlangıç matrisi

| Araç | Exact doğrulanan sürüm | Rol | Engine/peer sonucu | Lisans |
|---|---:|---|---|---|
| Node.js | `24.16.0` | Yerel/CI JavaScript runtime | Bütün seçilen araçların koşullarını karşılıyor | Node.js lisansı |
| npm | `11.13.0` | Paket yöneticisi/lockfile | Node 24 ile mevcut ortamda çalışıyor | Artistic-2.0 |
| create-vite | `9.1.0` | Bir defalık resmi scaffold | Node `^20.19 || >=22.12` | MIT |
| Vite | `8.1.0` | Dev server ve production build | Node `^20.19 || >=22.12` | MIT |
| `@vitejs/plugin-react` | `6.0.3` | React Fast Refresh/JSX entegrasyonu | Vite `^8`; React Compiler peer'ı opsiyonel | MIT |
| React / React DOM | `19.2.7` | UI runtime/DOM renderer | Birbiriyle exact uyumlu | MIT |
| TypeScript | `6.0.3` | Static type checking | Node `>=14.17` | Apache-2.0 |
| React Router | `8.0.1` | Browser route ve protected-route kabuğu | Node `>=22.22`, React/DOM `>=19.2.7` | MIT |
| TanStack Query | `5.101.2` | Server-state cache, request/mutation durumu | React `^18 || ^19` | MIT |
| Vitest | `4.1.9` | Vite-native unit/component test runner | Node 24 ve Vite 8 destekli | MIT |
| Testing Library React | `16.3.2` | Kullanıcı davranışı odaklı component testleri | React 18/19 | MIT |
| Testing Library DOM | `10.4.1` | Semantic DOM query ve assertion tabanı; React paketinin peer dependency'si | Node `>=18` | MIT |
| Testing Library user-event | `14.6.1` | Gerçekçi click/type/focus kullanıcı etkileşimi | Testing Library DOM ekosistemi | MIT |
| Testing Library jest-dom | `6.9.1` | DOM assertion'ları | Node `>=14` | MIT |
| jsdom | `29.1.1` | Vitest için browser DOM simülasyonu | Node `>=24` destekli | MIT |
| ESLint | `10.6.0` | JavaScript/TypeScript lint | Node 24 destekli | MIT |
| typescript-eslint | `8.62.0` | ESLint TypeScript parser/rules | ESLint 8/9/10, TypeScript `<6.1` | MIT |
| TanStack Query ESLint plugin | `5.101.2` | Query kullanım hatalarını yakalama | ESLint 8/9/10, TypeScript 5.4/6 | MIT |

`@types/react 19.2.17` ve `@types/react-dom 19.2.3` TypeScript 6 etiketlerini ve React 19 tiplerini destekler.

### React Router 7 → 8 karar değişikliği

Önceki plan React Router 7 hattını hedefliyordu. Araştırma gününde `react-router@8.0.1` kararlı sürüm olmuştu. İki seçenek karşılaştırıldı:

| Seçenek | Artı | Eksi | Sonuç |
|---|---|---|---|
| `react-router@7.18.0` | Daha uzun saha süresi; Vite 8 ve TS6 desteği mevcut | Yeni projede yakın major geçişi ve eski minimum baseline | Geçerli fakat seçilmedi |
| `react-router@8.0.1` | Node 24 + React 19.2.7 + Vite 8 tabanımızla tam hizalı; yeni projede migration borcu yok | Çok yeni major; paket tabanı ayrıca izlenmeli | Seçildi |

v8 minimumları Node `22.22+`, React/DOM `19.2.7+` ve Vite `7+`tır. FlowLogix bunları karşılar. v8'de eski `react-router-dom` paketi kaldırılmıştır; yeni kod resmi `react-router` paketinden import yapacak. FlowLogix **Declarative Mode** ile `<BrowserRouter>` kullanacak; React Router Framework Mode veri yükleme/SSR sorumluluğu almayacak. Server state TanStack Query'de, backend ise ASP.NET Core'da kalacak.

### Bilinçli başlangıç sınırları

- Resmi `react-ts` template kullanılacak; `react-compiler-ts` seçilmeyecek. React Compiler peer dependency'si opsiyoneldir ve henüz ölçülmüş ihtiyaç yoktur.
- Redux/Zustand eklenmeyecek. Auth/session ve Customer verisi server state olarak Query ile; küçük UI state'i React state/context ile ele alınacak.
- Axios eklenmeyecek; başlangıçta same-origin `fetch` wrapper yeterlidir.
- React Hook Form benzeri form kütüphanesi ilk basit form görülmeden eklenmeyecek.
- React Router Data/Framework Mode ile TanStack Query aynı veri sahipliği problemine bindirilmeyecek.
- Vitest template tarafından gelmediği için ayrı küçük adımda kurulacak; yalnız build veren fakat `npm test` script'i olmayan foundation tamamlanmış sayılmayacak.
- Direct dependency sürümleri `package-lock.json` ile exact çözümlenecek; CI yalnız `npm ci` kullanacak.

### Node ve TLS ortam notu

Yerel ilk `npm view` çağrısı `UNABLE_TO_VERIFY_LEAF_SIGNATURE` verdi. `strict-ssl=false` reddedildi. Node 24'ün Windows güvenilir kök deposunu kullanan process-level `NODE_OPTIONS=--use-system-ca` ayarıyla, `strict-ssl=true` korunarak registry erişimi başarıyla doğrulandı.

Frontend scaffold/install komutları bu oturum ayarıyla çalıştırılacak. Repository'ye kurumsal CA dosyası veya TLS bypass ayarı yazılmayacak. Node `24.16.0` ve npm `11.13.0` frontend config/CI aşamasında açıkça pinlenecek.

### Sonar uyumluluk notu

TypeScript `6.0.3` kararlı ve seçilen lint/type paketleriyle uyumludur. SonarQube Cloud'un tam TypeScript desteği henüz `5.9.3`te kaldığı için R-012'deki C#-önce analiz kapısı korunur; frontend sürümü Sonar uğruna düşürülmez.

### Kaynaklar

- [React — Versions](https://react.dev/versions)
- [npm — React](https://www.npmjs.com/package/react)
- [Vite — Getting Started](https://vite.dev/guide/)
- [Vite — Announcing Vite 8](https://vite.dev/blog/announcing-vite8)
- [npm — create-vite](https://www.npmjs.com/package/create-vite)
- [React Router — Declarative installation](https://reactrouter.com/start/declarative/installation)
- [React Router — v8 changelog](https://reactrouter.com/start/start/changelog)
- [npm — React Router](https://www.npmjs.com/package/react-router)
- [TanStack Query — Installation](https://tanstack.com/query/v5/docs/framework/react/installation)
- [npm — TanStack Query](https://www.npmjs.com/package/%40tanstack/react-query)
- [Microsoft — TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)
- [npm — Vitest](https://www.npmjs.com/package/vitest)

## R-014 — Frontend mimarisi ve HTTP istemcisi

**Tarih:** 2026-06-29
**Durum:** Tamamlandı

FlowLogix ekranları yalnız görsel sayfalardan oluşmayacak; oturum, yetki, arama/sayfalama, mutation, standart hata ve antiforgery davranışlarını tutarlı biçimde taşıyacak. Bu nedenle başlangıç mimarisi teknoloji türlerine göre yatay klasörler yerine iş kabiliyetlerine göre dikey dilimler kullanacak.

### Önerilen sınırlar

```text
src/
  app/                 # bootstrap, provider, router ve ana layout composition'ı
  features/
    auth/              # auth API, hook, component ve route parçaları
    customers/         # customer API, hook, component ve route parçaları
  shared/
    api/               # HTTP policy, Problem Details ve ApiError
    ui/                # ancak gerçekten tekrar kullanılan sunum parçaları
    lib/               # iş/domain bilmeyen küçük teknik yardımcılar
```

Klasörler scaffold anında boş olarak topluca oluşturulmayacak; ilk gerçek dosyayla birlikte açılacak. Route bileşeni akışı düzenler, feature bileşeni kullanıcı etkileşimini sunar, backend iş kurallarının otoritesi olmaya devam eder.

### State sahipliği

| Veri türü | Sahibi | Neden |
|---|---|---|
| Sayfa, arama, filtre, sıralama | URL / React Router search params | Yenileme, geri/ileri ve paylaşılabilir bağlantı korunur |
| Session, müşteri listesi/detayı | TanStack Query | Uzak verinin cache, loading, error, invalidation ve refetch yaşam döngüsünü yönetir |
| Açık menü, input taslağı, geçici seçim | Yerel React state | Yalnız ilgili bileşenin kısa ömürlü durumudur |
| Gerçek çapraz ekran UI ihtiyacı | Önce Context + reducer değerlendirmesi | Redux/Zustand varsayılan değil, kanıtlanmış ihtiyaçtır |

React dokümantasyonu redundant/duplicate state'ten kaçınmayı, render için türetilebilen değerleri state veya Effect içine taşımamayı ve Effect'i dış sistem senkronizasyonu için kullanmayı önerir. API server state'i bileşenlerde `useEffect + useState` ile tekrar kurulmayacak; TanStack Query bu sorumluluğun sahibidir.

### Fetch ve Axios karşılaştırması

| Ölçüt | Native `fetch` | Axios |
|---|---|---|
| Dependency | Browser'ın standart API'si; ek paket yok | Üçüncü taraf runtime dependency |
| HTTP hata davranışı | `4xx/5xx` promise'i reddetmez; wrapper `response.ok` kontrol etmelidir | Varsayılan olarak `2xx` dışını reject eder |
| JSON/Problem Details | Açıkça parse ve tip dönüşümü gerekir | JSON dönüşümü daha hazırdır; FlowLogix hata tipine yine adapter gerekir |
| Cookie/CSRF | Same-origin cookie varsayılan; antiforgery header açık politikayla eklenir | Credentials/XSRF config ve interceptor ile merkezileştirilebilir |
| İptal | Standart `AbortSignal`; TanStack Query sinyali doğrudan iletir | `AbortController` destekler, ancak FlowLogix'e ek üstünlük sağlamaz |
| Global davranış | Küçük wrapper ile görünür ve projeye özel | Interceptor güçlüdür; aşırı kullanım gizli global akış ve coupling oluşturabilir |

**Karar:** FlowLogix native `fetch` üzerinde küçük, tipli ve framework-bağımsız bir `shared/api` istemcisi kullanacak. Bu “fetch yeterli” kararı değildir: mevcut same-origin cookie modeli, ASP.NET Core Problem Details sözleşmesi ve TanStack Query `AbortSignal` akışı için en az bağımlılıkla en açık politika yüzeyini verir.

İstemci; API-relative URL, JSON serialization, `response.ok`, `204`, content type, typed Problem Details/`ApiError`, request cancellation ve state-changing isteklerde antiforgery header politikasını tek yerde uygulayacak. Feature'lar endpoint/DTO bilgisini taşıyacak; React bileşenleri doğrudan `fetch` çağırmayacak.

Dosya upload progress, browser/Node ortak adapter, çok sayıda dış API için farklı transport politikaları veya gerçekten merkezi interceptor zinciri doğarsa Axios yeniden değerlendirilecek.

### React yazım ve tasarım kuralları

- Bileşenler `PascalCase`, hook'lar `useX`; component ve hook'lar saf, props/state immutable olacak.
- Hook'lar yalnız component/custom hook tepesinde çağrılacak; koşul, döngü veya callback içine konmayacak.
- `useEffect` türetilmiş state, event sonucu veya normal veri yükleme için kullanılmayacak; yalnız React dışı sistemle senkronizasyon için kullanılacak.
- Server mutation başarıları ilgili Query key'lerini invalidate edecek; server verisi ikinci bir global/local store'a kopyalanmayacak.
- Feature'a özel DTO, query key, API fonksiyonu ve test feature yanında kalacak. `shared` klasörü “belki kullanılır” deposu olmayacak.
- Semantic HTML, label, klavye kullanımı ve görünür focus ilk bileşenden itibaren kabul kriteridir.
- `memo`, `useMemo` ve `useCallback` performans ölçümü veya referans kararlılığı gereği olmadan eklenmeyecek.
- Testler implementation ayrıntısını değil kullanıcının gördüğü ve yaptığı davranışı sınayacak.

### Kaynaklar

- [MDN — Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Axios — First steps](https://axios.rest/pages/getting-started/first-steps)
- [Axios — Interceptors](https://axios.rest/pages/advanced/interceptors)
- [Axios — Error handling](https://axios.rest/pages/advanced/error-handling)
- [TanStack Query — Query cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation)
- [React — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React — Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React — Components and Hooks must be pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure)

## R-015 — Node/npm ve frontend dependency sürüm sözleşmesi

**Tarih:** 2026-06-29
**Durum:** Tamamlandı

`package.json`, uygulamanın doğrudan dependency niyetini; `package-lock.json` ise transitive dependency'ler dahil kurulmuş tam ağacı taşır. npm'in `npm ci` komutu manifest ile lockfile uyuşmazsa hata verir, mevcut `node_modules` klasörünü temizler ve manifest/lockfile'a yazmadan donmuş kurulumu tekrarlar.

FlowLogix yayınlanan bir npm kütüphanesi değil, deploy edilen bir uygulamadır. Bu nedenle direct dependency sürümleri manifestte exact tutulacak; transitive ağacı lockfile sabitleyecek. Güncellemeler örtük `npm install` yan etkisiyle değil, ayrı dependency güncellemesi ve lint/test/build doğrulamasıyla yapılacak.

Node için repository kökündeki `.nvmrc` exact `24.16.0` sürümünü yerel version-manager ve gelecekteki `actions/setup-node` girdisi olarak taşıyacak. `package.json` içindeki `engines`, desteklenen Node/npm major hattını görünür kılacak; patch güvenlik güncellemesini gereksiz yere engellemeyecek. `packageManager: npm@11.13.0` seçilen package manager ve sürümünü araçlara bildirecek.

### Kaynaklar

- [npm — package-lock.json](https://docs.npmjs.com/files/package-lock.json/)
- [npm — npm ci](https://docs.npmjs.com/cli/commands/npm-ci/)
- [GitHub — actions/setup-node](https://github.com/actions/setup-node)
- [GitHub — setup-node version files](https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md)

## R-016 — Frontend lint derinliği ve plugin uyumluluğu

**Tarih:** 2026-06-29
**Durum:** Tamamlandı

Mevcut ESLint hattı JavaScript, TypeScript syntax, React Hooks ve Fast Refresh kurallarını çalıştırıyor; ancak TypeScript type bilgisini kullanmıyor, TanStack Query cache/hook hatalarını ve Testing Library test örüntülerini özel olarak denetlemiyor.

### Karşılaştırma ve sonuç

- `typescript-eslint` resmi rehberi `recommendedTypeChecked` ve `projectService: true` ile typed lint'i güçlü biçimde öneriyor. Maliyeti, lint sırasında TypeScript programı oluşturulduğu için syntax-only lint'ten daha yavaş olmasıdır. FlowLogix'in küçük başlangıç kod tabanında safety faydası bu maliyetten değerlidir.
- `@tanstack/eslint-plugin-query@5.101.2`, ESLint 8/9/10 ve TypeScript 5.4/6 peer aralıklarını destekler. Resmi `flat/recommended` profili query dependency, stable client ve query function hatalarını yakalar. Daha opinionated `recommended-strict`, gerçek Query kodu görülmeden seçilmeyecek.
- `eslint-plugin-testing-library@7.16.2`, ESLint 10'u destekler ve yalnız `*.test.*` dosyalarına uygulanabilen `flat/react` profilini sağlar.
- `eslint-plugin-jest-dom@5.5.0` faydalı assertion kuralları sunsa da peer dependency aralığı ESLint 10'u kapsamıyor. `--force` veya peer uyarısı bastırılarak eklenmeyecek; uyumlu sürüm yayımlanırsa yeniden değerlendirilecek.

### Kaynaklar

- [typescript-eslint — Typed Linting](https://typescript-eslint.io/getting-started/typed-linting/)
- [TanStack Query — ESLint Plugin Query](https://tanstack.com/query/v5/docs/eslint/eslint-plugin-query)
- [Testing Library — eslint-plugin-jest-dom](https://testing-library.com/docs/ecosystem-eslint-plugin-jest-dom/)
- [eslint-plugin-testing-library npm metadata](https://www.npmjs.com/package/eslint-plugin-testing-library)

## R-017 — TypeScript strictness politikası

**Tarih:** 2026-06-29
**Durum:** Tamamlandı

Vite React template'i mevcut üretimde `strict` seçeneğini açıkça taşımıyor. FlowLogix API DTO, form ve server-state ağırlıklı bir ERP arayüzü olacağı için yalnız syntax/type inference yeterli değildir.

### Seçilen kontroller

- `strict`: nullability, function variance, property initialization ve catch variable gibi strict ailesini birlikte açar.
- `noUncheckedIndexedAccess`: dizi/index-signature erişimlerine olası `undefined` ekler; bulunmayan satır veya alanın varmış gibi kullanılmasını engeller.
- `exactOptionalPropertyTypes`: `field?: T` için alanın yokluğu ile `field: undefined` farkını korur. PATCH/request DTO semantiği için değerlidir.
- `noImplicitReturns`: değer döndürmesi beklenen bütün code path'lerin sonuç üretmesini ister.
- `noUncheckedSideEffectImports`: CSS/setup gibi yalnız yan etki için yapılan import'lardaki yazım hatasını sessizce yutmaz.
- `forceConsistentCasingInFileNames`: Windows'ta çalışan fakat Linux CI'da dosya adı casing'i nedeniyle kırılan import'ları engeller.
- App lib listesine `DOM.Iterable` eklenir; `URLSearchParams`, header ve DOM koleksiyonlarının iterable tipleri kullanılabilir.

`skipLibCheck: true` korunur: uygulama kaynaklarının type-check'ini kapatmaz, dependency declaration dosyalarının kendi aralarındaki tam kontrolünü atlar. Third-party declaration gürültüsünü ve build maliyetini azaltır.

### Kaynaklar

- [TypeScript — strict](https://www.typescriptlang.org/tsconfig/strict.html)
- [TypeScript — noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)
- [TypeScript — exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html)
- [TypeScript — noImplicitReturns](https://www.typescriptlang.org/tsconfig/noImplicitReturns.html)
- [TypeScript — noUncheckedSideEffectImports](https://www.typescriptlang.org/tsconfig/noUncheckedSideEffectImports.html)
- [TypeScript — forceConsistentCasingInFileNames](https://www.typescriptlang.org/tsconfig/forceConsistentCasingInFileNames.html)

## R-018 — Development HTTPS ve Vite proxy güven zinciri

**Tarih:** 2026-06-29
**Durum:** Tamamlandı

API HTTPS launch adresi `https://localhost:7185`; Vite dev server browser'dan gelen `/api` isteklerini server-side proxy ile bu hedefe aktaracak. Böylece browser Vite origin'ine istek yapar ve CORS yerine production'a benzeyen same-origin cookie modeli korunur.

Yerel ASP.NET Core development certificate geçerli fakat başlangıçta trusted değildi. Kullanıcı `dotnet dev-certs https --trust` ile Current User trust store'a açıkça güven verdi; CLI `TrustLevel: Full`, `localhost` SAN ve geçerlilik süresini doğruladı.

Vite proxy Node process'i içinde çalışır. Node 24 system CA store'u ancak `--use-system-ca`/`NODE_USE_SYSTEM_CA` ile ekler. npm'in project `.npmrc` içindeki `node-options` ayarı lifecycle script'lerine `NODE_OPTIONS` olarak aktarılır, npm process'inin kendisini etkilemez. Frontend `.npmrc` bu nedenle mevcut kullanıcı seçeneklerini koruyarak `--use-system-ca` ekleyecek.

`secure: false`, self-signed sertifika doğrulamasını devre dışı bıraktığı için seçilmedi. `cross-env` veya repository'ye export edilmiş sertifika eklemek de gerekli değildir.

### Kaynaklar

- [Microsoft — dotnet dev-certs](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-dev-certs)
- [Node.js — `NODE_USE_SYSTEM_CA`](https://nodejs.org/api/cli.html#node_use_system_ca1)
- [npm — project `.npmrc` ve node-options](https://docs.npmjs.com/files/npmrc/)
- [npm — node-options config](https://docs.npmjs.com/cli/using-npm/config/)
- [Vite — server.proxy](https://vite.dev/config/server-options)

## R-019 — ERP frontend component ve styling temeli

**Tarih:** 2026-06-30
**Durum:** Tamamlandı

FlowLogix; form, durum geri bildirimi, navigasyon, yoğun liste ve ileride grid/date-picker gerektiren operasyonel bir ERP/TMS arayüzüdür. UI temeli yalnız görsel tercih değil; erişilebilirlik, klavye davranışı, tema tutarlılığı ve tek geliştiricinin teslim süresini etkiler.

### Karşılaştırma

| Seçenek | Güçlü taraf | FlowLogix maliyeti | Sonuç |
|---|---|---|---|
| Plain CSS / CSS Modules | En az dependency, tam kontrol, CSS öğrenimi | Form/dialog/menu erişilebilirliği ve ortak tasarım sistemi tekrar yazılır | Temel global CSS için kullanılabilir, ana component sistemi seçilmedi |
| Tailwind + açık component kodu | Yüksek görsel kontrol ve source ownership | Component kaynak/bakım yükü projeye geçer; ERP davranışlarını tek tek birleştirmek gerekir | Geçerli alternatif, MVP hızı için seçilmedi |
| Ant Design / Mantine | Hazır component seti ve iyi geliştirici deneyimi | FlowLogix'in gelecekteki data-grid ve Material ekosistem devamlılığına göre daha az uygun | Seçilmedi |
| Material UI v9 | React 19 uyumu, erişilebilir hazır component'ler, tema/CSS variables, MUI X Community evrim yolu | Emotion runtime dependency'si ve API öğrenme maliyeti | Seçildi |

MUI `9.1.2`, React 17/18/19 ve TypeScript 4.9+ destekler; FlowLogix React `19.2.7` ve TypeScript `6.0.3` ile uyumludur. Default styling engine olarak `@emotion/react 11.14.0` ve `@emotion/styled 11.14.1` kullanılır. Üçü de MIT lisanslıdır.

MUI X Data Grid Community MIT lisanslı pagination/sorting/filtering sağlar; Pro/Premium advanced özellikleri ticari lisanslıdır. Data Grid şimdi kurulmayacak. Customer listesi use-case'inde server-side gereksinim ve Community lisans sınırı yeniden incelenecek.

### Uygulama kuralları

- ThemeProvider ve CssBaseline app composition katmanında tek kez kurulacak.
- Marka rengi, spacing, typography ve component default'ları theme token'larında tutulacak; ekranlara rastgele hex/spacing dağıtılmayacak.
- Harici font CDN'i kullanılmayacak; ilk tema sistem font stack kullanacak.
- `sx` küçük ve yerel layout/stil için; tekrar eden ürün varyantı theme component override veya ortak UI component için kullanılacak.
- MUI component kullanmak semantic HTML, label, focus ve keyboard test sorumluluğunu ortadan kaldırmaz.
- Icon, Data Grid, date picker ve Pro/Premium paketleri gerçek ihtiyaç doğmadan eklenmeyecek.

### Kaynaklar

- [MUI — Stable versions](https://mui.com/material-ui/getting-started/versions/)
- [MUI — Installation and React peers](https://mui.com/material-ui/getting-started/installation/)
- [MUI — Supported platforms](https://mui.com/material-ui/getting-started/supported-platforms/)
- [MUI — Theming](https://mui.com/material-ui/customization/theming/)
- [MUI X — Data Grid](https://mui.com/x/react-data-grid/)
- [MUI X — Licensing](https://mui.com/x/introduction/licensing/)
- [Tailwind — Utility-first styling](https://tailwindcss.com/docs/utility-first/)

## R-020 — FlowLogix'e özgü Operasyon Kontrol Kulesi tasarım dili

**Tarih:** 2026-06-30
**Durum:** Tamamlandı

FlowLogix farklılığını dekoratif dashboard kartlarından değil, Word ürün referansındaki operasyon istisnaları, açıklanabilir atama, planlanan–gerçekleşen kârlılık, dijital sevkiyat pasaportu ve belge tamlığı davranışlarından alacak.

### Görsel ve etkileşim imzası

- Koyu lacivert operasyon navigasyonu, açık ve yüksek kontrastlı çalışma yüzeyi; masaüstü operasyon yoğunluğu öncelikli, küçük ekranlar işlevsiz bırakılmayacak.
- Planlanan akış kesik, gerçekleşen akış düz çizgiyle; gecikme ve sapma ayrı işaret/etiketle gösterilecek.
- Exception kartı yalnız renk değil önem, neden, geçen süre ve önerilen aksiyon taşıyacak.
- Açıklanabilir atama puanı; katkı, engel ve hard/soft constraint nedenleriyle birlikte gösterilecek.
- Belge tamlığı görsel oranla birlikte eksik/geçersiz belge listesini sunacak.
- Planlanan–gerçekleşen kârlılık sapması renk, yön ikonu ve sayısal değerle anlatılacak.
- Animasyonlar kısa ve işlevsel olacak; reduced-motion tercihi desteklenmeden kritik bilgi animasyona bağlanmayacak.
- Glassmorphism, yoğun gradient, sürekli hareket ve renk-only status kullanımı operasyon okunabilirliğini bozduğu için tasarım hedefi değildir.

### Kütüphane kapıları

| Araç | Olası kullanım | Benimseme kapısı |
|---|---|---|
| `@phosphor-icons/react 2.1.10` | Duotone operasyon/navigation ikonları | İlk gerçek shell navigasyonunda direct-path import ve bundle ölçümü |
| `motion 12.42.0` | Route/feedback geçişleri | CSS transition yetersiz kalır ve reduced-motion davranışı test edilebilir olur |
| `@mui/x-charts 9.7.0` | Kârlılık ve KPI grafikleri | Gerçek KPI veri sözleşmesi tanımlanır |
| `maplibre-gl 5.24.0` + React binding | Sevkiyat/durak haritası | Harita use-case'i, tile sağlayıcı/lisans/maliyet/CSP kararı netleşir |
| `@mui/x-data-grid` Community | Server-side müşteri/operasyon listeleri | İlk gerçek liste use-case'inde Community özellik/lisans sınırı doğrulanır |

Şimdi yalnız theme ve shell için gereken mekanizmalar kurulacak; roadmap'teki bütün “havalı” araçlar foundation'a yığılmayacak.

### Kaynaklar

- [MUI — Free dashboard templates](https://mui.com/material-ui/getting-started/templates/)
- [MUI — CSS theme variables](https://mui.com/material-ui/customization/css-theme-variables/overview/)
- [Phosphor React — tree shaking ve direct import](https://github.com/phosphor-icons/react)
- [Motion — reduced motion](https://motion.dev/docs/react-use-reduced-motion)
- [MUI X — charts/data-rich components](https://mui.com/x/)
- [MapLibre GL JS](https://maplibre.org/projects/gl-js/)

## R-021 — Frontend formatter ve editör bağımsız format kapısı

**Tarih:** 2026-06-30

**Durum:** Tamamlandı

`Ctrl+S` dosyayı kaydeder; Visual Studio'da ayrıca formatter entegrasyonu veya format-on-save olmadığı sürece mevcut TSX girintisini yeniden yazmaz. `.editorconfig` kuralı editöre ve uyumlu araçlara politika bildirir, tek başına bütün eski satırları dönüştüren bir komut değildir.

### Karşılaştırma

| Seçenek | Güçlü taraf | FlowLogix etkisi | Sonuç |
|---|---|---|---|
| Yalnız `.editorconfig`/Visual Studio | Ek paket yok | Editör desteğine bağlı; CI mevcut biçimi güvenilir biçimde denetleyemez | Tek başına yetersiz |
| Prettier | Deterministik format, geniş TS/TSX desteği, `.editorconfig` okuma, ayrı `--write`/`--check` | Tek format dependency'si ve ilk toplu format farkı | Seçildi |
| Biome | Çok hızlı birleşik formatter ve linter | Mevcut type-aware ESLint ve framework plugin hattıyla sorumluluk çakışması veya tam göç gerektirir | Şimdi seçilmedi |
| ESLint formatting kuralları/plugin | Tek lint komutunda görünür | Linter ile formatter sorumluluğunu ve hata çıktısını karıştırır | Seçilmedi |

Prettier'ın resmi kurulum rehberi exact, proje-yerel sürüm kullanılmasını; editor eklentisinin de bu yerel sürümü seçmesini ve CI için `prettier . --check` çalıştırılmasını önerir. Prettier `.editorconfig` içindeki `indent_size` ve `end_of_line` gibi alanları okuyabilir. FlowLogix bu nedenle 2 boşluk/LF kararını tekrar etmeyecek; yalnız semicolon, quote, trailing comma ve satır genişliğini Prettier config içinde belirtecek.

İlk `format:check`, `AppProviders.tsx` dâhil 14 mevcut dosyada format farkı buldu. Bu sonuç formatter kurulumunun çalıştığını, fakat ilk baseline'ın kullanıcı tarafından henüz yazılmadığını gösterir.

### Kaynaklar

- [Prettier — Install](https://prettier.io/docs/install)
- [Prettier — Configuration ve EditorConfig](https://prettier.io/docs/configuration)
- [Prettier — Editor integration](https://prettier.io/docs/editors/)
- [typescript-eslint — What About Formatting?](https://typescript-eslint.io/users/what-about-formatting/)
- [Biome — Formatter ve Prettier uyumluluğu](https://biomejs.dev/)
