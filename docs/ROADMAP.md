# FlowLogix Yol Haritası

## Planlama temeli

- Kapasite: haftada 10–15 saat
- MVP hedefi: 2–3 ay
- Ayrıntı seviyesi: yalnız Faz 0 ve ilk iki hafta task düzeyinde
- Sonraki fazlar, önceki karar kapısı kapanmadan ayrıntılı backlog'a dönüştürülmez

## Faz 0 — Bağlam ve çalışma zemini

**Hedef:** Proje hafızasını kurmak, onaylanan kapsamı kaydetmek ve tekrarlanabilir geliştirme zemini hazırlamak.

### Çıktılar

- Yaşayan proje belgeleri
- Git çalışma şekli
- .NET SDK ve yerel SQL Server doğrulaması
- Solution/proje iskeleti
- Backend ve frontend için ilk build
- GitHub Actions ve aşamalı SonarQube Cloud kalite zemini
- SonarQube sonrasında ücretsiz ortamda ilk demo deployment provası

### Çıkış ölçütü

Repository'de belgeler ve kullanıcı tarafından oluşturulmuş çalışan solution bulunur; backend ve frontend clean build verir, uzak CI yeşildir ve ücretsiz demo URL'si üzerinde same-origin uygulama kabuğu doğrulanır.

## SonarQube sonrası — İlk demo deployment provası

Bu adım yeni ürün modülü değildir; Faz 0'ın “yerelde çalışan kodu güvenli ve tekrarlanabilir biçimde yayınlama” kapanışıdır.

### Planlanan çıktı

- Azure App Service Free F1 üzerinde .NET 10 host
- ASP.NET Core tarafından sunulan React production çıktısı ve same-origin `/api`
- GitHub Actions üzerinden önce elle tetiklenen, OIDC tabanlı deployment
- HTTPS, SPA fallback, API, log ve yeniden başlatma smoke kontrolleri
- Ücretsiz kota aşımında otomatik ücret doğurmayacak ayarlar ve silme/geri dönüş notu

### Veritabanı kapısı

Bulut Azure SQL kaynağı yalnız ilk gerçek Identity migration'ı hazır olduğunda oluşturulur. Azure SQL Database Free offer seçilirse migration SQL'i incelenir, connection string App Service ayarında tutulur ve kota aşım davranışı “ay sonuna kadar otomatik durdur” olur.

### Karar kapısı

Kullanıcı Azure hedefini ve abonelik sınırlarını onaylamadan bulut kaynağı, secret veya federated credential oluşturulmaz. İlk deployment smoke kontrolü geçmeden otomatik `main` deployment'ı açılmaz.

## 1. Hafta — Foundation ve Identity başlangıcı

### Ürün çıktısı

- Çalışan uygulama kabuğu
- Güvenli config
- Identity veritabanı şeması
- Development admin seed yaklaşımı

### Öğrenme odağı

- .NET solution ve proje referansları
- Modüler monolith sınırı
- ASP.NET Core DI/configuration
- EF Core DbContext ve migration yaşam döngüsü
- Cookie authentication ve CSRF tehdidi

### Karar kapısı

Identity migration SQL'i, cookie/antiforgery davranışı ve secret yönetimi build/test ile doğrulanır.

## 2. Hafta — İlk dikey dilim

### Ürün çıktısı

- Admin giriş/çıkış/session
- Müşteri listesi ve oluşturma
- Müşteri detayı
- Müşteriye lokasyon ekleme
- Server-side arama, aktiflik filtresi, sıralama ve sayfalama

### Öğrenme odağı

- Aggregate sınırı ve invariants
- DTO/domain/persistence ayrımı
- SQL Server benzersizlik ve yarış davranışı
- Problem Details ve HTTP hata semantiği
- React Router, TanStack Query, form ve auth state

### Karar kapısı

Kritik E2E akışı ve backend integration testleri geçmeden sipariş/sevkiyat fazına başlanmaz.

## Sonraki yüksek seviye yön

1. Filo ana verisi
2. Taşıma talebi ve ticari sipariş
3. Sevkiyat planlama ve açıklanabilir atama
4. Execution timeline ve POD
5. Exception merkezi
6. Faturalama hazırlığı ve kârlılık
7. Dashboard, rapor, hardening ve release

Bu başlıklar henüz task backlog'u değildir.

## Sürüm bazlı mimari öğrenme yönü

Bu bölüm task backlog'u değildir; Word ürün referansındaki büyüme yönlerinin hangi teknik problemi öğretmesinin beklendiğini gösterir.

1. **v0.2 — Tedarikçi/taşeron:** bounded context, modül contract'ı ve dış kaynak maliyeti.
2. **v0.3 — Depo/stok:** inventory ledger, barcode adapter ve concurrency.
3. **v0.4 — CRM/fiyatlandırma:** workflow, policy/strategy ve versioned pricing.
4. **v0.5 — Finans entegrasyonu:** idempotency, anti-corruption adapter ve transactional outbox.
5. **v0.6 — Portal/public API:** API versioning, rate limit ve contract testing.
6. **v0.7 — Sürücü PWA:** offline sync, conflict resolution ve gerektiğinde realtime.
7. **v1.0 — SaaS:** tenant izolasyonu, observability ve deployment olgunluğu.
8. **Daha sonra — Seçici mikroservis:** yalnız gerçek bağımsız deployment/ölçek/ekip ihtiyacı olan bounded context için broker ve distributed consistency.

Gelecek teknolojiler bugünden kurulmaz. Bugün korunacak yatırım; modül veri sahipliği, açık contract'lar, idempotency/concurrency farkındalığı ve domain/application/integration event ayrımıdır.
