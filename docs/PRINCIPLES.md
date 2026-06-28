# FlowLogix Çalışma Prensipleri

## 1. Gerçeklik ve kaynak sırası

Karar ve doğrulama sırası:

1. Mevcut kaynak kod, test, config ve gerçek çalışma sonucu
2. Kullanıcının açıkça onayladığı kararlar ve `DECISIONS.md`
3. `PROJECT-BRIEF.md`, `ROADMAP.md`, `BACKLOG.md`, `PROGRESS.md`
4. FlowLogix kapsamlı Word belgesi
5. Güncel ve güvenilir dış kaynaklar
6. Açıkça etiketlenmiş geçici varsayımlar

Çelişki sessizce çözülmez; etkisi ve önerilen çözümü kullanıcıya açıklanır. Dokümanda veya kodda bulunmayan sektör bilgisi gerçekmiş gibi yazılmaz.

## 2. Kaynak kodu yetkisi

- Kaynak kodunu kullanıcı yazar.
- Agent gerekli kodu tam dosya yolu, bağımlılıklar ve açıklamalarla verir.
- Agent yalnız açıkça izin verilen belirli ve mekanik frontend taskında kod değiştirebilir.
- Agent yaşayan Markdown belgelerini oluşturup güncelleyebilir.
- Kullanıcının değişiklikleri geri alınmaz.

## 3. Öğretici çalışma biçimi

Her adım önce kod bilmeyen biri için kısa bir amaç/benzetmeyle, ardından geliştirici seviyesinde gerçek davranış ve risklerle anlatılır. Teknik terim ilk geçtiğinde sade karşılığı verilir; fakat doğruluk uğruna gerekli ayrıntı saklanmaz.

Her kaynak kod adımı şu sırayı izler:

1. İş amacı ve lojistik/ERP karşılığı
2. Öğrenme hedefi
3. Seçilen tasarım, makul alternatif ve tercih nedeni
4. Etkilenecek tam dosya yolları
5. Paket, proje referansı, DI ve config gereksinimleri
6. Küçük, mantıksal ve eksiksiz kod
7. Kritik framework ve domain davranışının açıklaması
8. Riskler ve edge case'ler
9. Kullanıcının uygulayacağı kesin adım
10. Uygulama sonrası repository incelemesi ve build/test
11. Kısa öğrenme özeti ve kontrol soruları

## 4. Araştırma disiplini

- Lojistik süreç, durum, belge, ekran ve kural soruları önce resmi/standart/ürün kaynaklarından araştırılır.
- En az iki makul seçenek kıyaslanır.
- Öneri tek geliştirici, 2–3 aylık MVP ve öğrenme hedefiyle gerekçelendirilir.
- Mevzuat yorumu hukuki kesinlik gibi sunulmaz; kapsam ve tarih belirtilir.
- Yeni paket önerilmeden önce güncellik, lisans, .NET/Node uyumu ve projede zaten bulunup bulunmadığı kontrol edilir.

## 5. Mimari ve kod kalitesi

- Modüler monolith başlangıç tercihidir; modül veri sahipliği korunur.
- Controller/endpoint ve React bileşenlerine domain kuralı dağıtılmaz.
- API modeli, domain modeli ve persistence ihtiyacı otomatik olarak tek sınıf yapılmaz.
- Generic repository, MediatR, CQRS, broker, Redis, Dapper, Hangfire, SignalR veya Aspire somut ihtiyaç olmadan eklenmez.
- Nullable reference types, async/await, cancellation, DI, Options, structured logging ve güvenli configuration uygulanır.
- Para `decimal` ve para birimiyle; zaman UTC ve açık saat dilimi politikasıyla ele alınır.
- Secret, token ve gerçek connection string repository'ye yazılmaz.
- Her metoda giriş/çıkış logu eklenmez; hata, önemli iş olayı, entegrasyon ve audit ayrılır.

## 6. Test ve kapanış

- Domain kuralları unit; SQL/transaction/auth davranışı integration; yalnız kritik kullanıcı akışları E2E test edilir.
- Build/test sonucu görülmeden task tamamlanmış sayılmaz.
- Migration üretilince SQL ve veri kaybı riski incelenmeden uygulanmaz.
- Task sonunda kabul kriteri, negatif senaryolar, dokümanlar ve öğrenme kaydı birlikte kapatılır.

## 7. Git

- `main` tabanlı kısa ömürlü `feature/FLOW-xxx-*` branch'leri kullanılır.
- Conventional Commit mesajları önerilir.
- Agent kullanıcı istemeden Git durumunu değiştiren komut çalıştırmaz.
- `docs/` proje hafızasıdır ve version control dışında bırakılmaz.

## 8. Context küçülmesi ve proje hafızası

- Sohbet hafızası veya otomatik özet doğruluk kaynağı değildir; yeni taskta `AGENTS.md` okuma sırası uygulanır.
- Doğrulanan her küçük adımdan sonra `PROGRESS` ve `BACKLOG`; karar değiştiğinde `DECISIONS/RESEARCH`; öğrenme oluştuğunda `LEARNING` aynı turda güncellenir.
- `PROGRESS.md` her zaman aktif taskı, gerçek branch/commit durumunu, son build/test sonucunu, açık riskleri ve sıradaki tek kesin adımı taşır.
- Context küçülmesi veya yeni sohbete geçiş öncesi repository, solution/project graph, Git durumu ve yaşayan belgeler karşılaştırılır.
- Belgeler gerideyse yeni kaynak kod adımı verilmez; önce proje hafızası düzeltilir.
