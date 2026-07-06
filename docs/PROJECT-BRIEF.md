# FlowLogix Proje Özeti

## Ürün amacı

FlowLogix, küçük ve orta ölçekli yurtiçi karayolu taşımacılığı firmalarının müşteri taşıma taleplerini, ticari siparişleri, sevkiyat planlarını, özmal araç ve sürücü atamalarını, execution sürecini, teslimat kanıtını ve faturalama hazırlığını tek sistemden yönetmesini sağlayan web tabanlı operasyon platformudur.

Hedef, haftada 10–15 saat çalışma ile 2–3 ay içinde çalışan bir MVP üretmek; aynı zamanda lojistik/ERP domainini ve güncel .NET geliştirme pratiklerini gerçek bir ürün üzerinden öğrenmektir.

## Hedef kullanıcılar

- Operasyon sorumlusu
- Filo sorumlusu
- Finans kullanıcısı
- Yönetici
- Sistem yöneticisi

Müşteri portalı ve sürücü uygulaması MVP sonrasıdır.

## Onaylanan MVP çalışma profili

- Yurtiçi karayolu taşımacılığı
- Tehlikesiz yük
- Komple taşıma; aynı sevkiyat içinde temel sıralı durak desteği
- Yalnız özmal araç ve sürücü
- Tek şirket ve tek operasyon şubesi
- Varsayılan para birimi `TRY`
- Kullanıcı gösterim saat dilimi `Europe/Istanbul`

## Ana ürün akışı

1. Müşteri ve lokasyon ana verisi tanımlanır.
2. Taşıma talebi oluşturulur ve ticari siparişe onaylanır.
3. Siparişten planlanabilir sevkiyat üretilir.
4. Uygun araç ve sürücü açıklanabilir kurallarla atanır.
5. Planlanan ve gerçekleşen operasyon olayları timeline'a eklenir.
6. POD ve zorunlu belge kontrolleri yapılır.
7. Açık kritik istisna yoksa iş faturalamaya hazır hâle gelir.
8. Planlanan ve gerçekleşen gelir/maliyet karşılaştırılır.

## Farklılaştırıcılar

- Operasyon İstisna Merkezi
- Açıklanabilir araç/sürücü ataması
- Planlanan–gerçekleşen kârlılık
- Dijital Sevkiyat Pasaportu
- Belge tamlık ve faturalama hazırlığı kontrolü

## Başlangıç domain sınırları

- Siparişin ticari durumu, sevkiyatın fiziksel durumu ve faturalama hazırlığı ayrı yaşam döngüleridir.
- Domain ilişkisi bir siparişten birden fazla sevkiyata izin verecek şekilde düşünülür; MVP arayüzü başlangıçta siparişten tek sevkiyat üretir.
- Parsiyel konsolidasyon, sipariş bölme/birleştirme ve taşıyıcı maliyet dağıtımı uygulanmaz.
- Execution olayı silinmez; yanlış kayıt düzeltme/reversal olayıyla açıklanır.

## MVP dışında

- Tam muhasebe, cari hesap, resmi e-Fatura/e-İrsaliye üretimi
- WMS, stok, raf, toplama ve barkod operasyonu
- Taşeron taşıyıcı ve dış kaynak filo
- Parsiyel yük konsolidasyonu ve rota optimizasyonu
- ADR/tehlikeli madde süreci
- GPS cihazı, canlı harita ve sürücü mobil uygulaması
- Multi-tenancy ve çok şube izolasyonu
- Mikroservis, broker ve Kubernetes
- OCR ve karbon emisyon hesabı

## Başarı ölçütü

MVP demosu en az şu akışı doğrulamalıdır:

`giriş → müşteri/lokasyon → sipariş → sevkiyat → açıklanabilir atama → execution timeline → POD → faturalamaya hazırlık`

İlk dikey dilim yalnız `giriş → müşteri oluştur → lokasyon ekle → liste/detayda gör` akışıdır.

