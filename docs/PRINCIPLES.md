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
- Agent, önce amacını ve tam değişikliği anlattığı mekanik frontend tooling/config dosyalarını kullanıcının verdiği sınırlı yetkiyle doğrudan değiştirebilir.
- Bu yetki React uygulama/ürün kodunu, backend/domain kodunu, migration'ı veya ürün davranışını kapsamaz; bu alanlarda task-bazlı açık izin gerekir.
- Agent yaşayan Markdown belgelerini oluşturup güncelleyebilir.
- Kullanıcının değişiklikleri geri alınmaz.

## 3. Öğretici çalışma biçimi

Her adım önce kod bilmeyen biri için kısa bir amaç/benzetmeyle, ardından geliştirici seviyesinde gerçek davranış ve risklerle anlatılır. Teknik terim ilk geçtiğinde sade karşılığı verilir; fakat doğruluk uğruna gerekli ayrıntı saklanmaz.

React adımlarında kullanıcının temel bileşen ve kütüphane kavramlarını bildiği kabul edilmez. `Box`, `Stack`, `sx`, provider, route veya hook gibi bir kavram ilk kez kullanıldığında önce ekranda neyi temsil ettiği, neden seçildiği ve diğer bileşenlerle nasıl çalıştığı açıklanır. Önce ortaya çıkacak ekranın genel görünümü anlatılır, sonra parçalar tanıtılır, en son kod verilir. Kopuk cümlelerden ve art arda kullanılan açıklamasız teknik terimlerden kaçınılır.

Öğretici metin gönderilmeden önce Türkçe anlatım yönünden gözden geçirilir. Yanlış kelime seçimi, yapay çeviri, eksik cümle ve gereksiz Türkçe–İngilizce karışımı düzeltilir. Zorunlu teknik terimin kısa Türkçe anlamı ilk kullanımda verilir.

Yanıt ayrıca React'i yeni öğrenen kullanıcının bakış açısıyla yeniden okunur. Açıklanmadan varsayılan kavramlar, ekranda oluşacak sonucu belirsiz bırakan anlatımlar ve adımlar arasındaki kopukluk giderilir. Türkçe karşılığı bulunan kavramlarda önce Türkçe ifade kullanılır; kaynak koddaki ad gerekiyorsa `route`, `layout` veya `provider` gibi teknik ad parantez içinde verilir.

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
- Frontend iş kabiliyetine göre dikey dilimlenir: uygulama composition'ı `app`, iş akışları `features`, gerçekten ortak teknik parçalar `shared` altında tutulur; kullanılmayan boş klasörler oluşturulmaz.
- Frontend state'inin tek sahibi olur: URL durumu Router, uzak API verisi TanStack Query, geçici ekran/form durumu React state; aynı veri ikinci bir state alanına kopyalanmaz.
- API çağrıları bileşenlere ve `useEffect` bloklarına dağıtılmaz; ortak HTTP politikası tipli API istemcisinde, iş endpointleri ilgili feature içinde tutulur.
- React bileşenleri ve hook'ları saf tutulur; state/props değiştirilmez, hook'lar koşullu çağrılmaz ve ölçülmüş ihtiyaç olmadan memoization eklenmez.
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
- Commitler dosya uzantısına göre değil tek bir değişiklik niyetine göre gruplanır; docs, build/tooling ve ürün davranışı gerekçesiz biçimde karıştırılmaz.
- Commit başlığı ne değiştiğini, gerektiğinde gövdesi nedenini, ana kapsamı ve çalıştırılan doğrulamayı açıklar.
- Commitler mümkün olduğunca bağımsız anlaşılır ve doğrulanabilir olur; yapay mikro-commit veya çok farklı işleri yutan dev commit oluşturulmaz.

## 8. Context küçülmesi ve proje hafızası

- Sohbet hafızası veya otomatik özet doğruluk kaynağı değildir; yeni taskta `AGENTS.md` okuma sırası uygulanır.
- Doğrulanan her küçük adımdan sonra `PROGRESS` ve `BACKLOG`; karar değiştiğinde `DECISIONS/RESEARCH`; öğrenme oluştuğunda `LEARNING` aynı turda güncellenir.
- `PROGRESS.md` her zaman aktif taskı, gerçek branch/commit durumunu, son build/test sonucunu, açık riskleri ve sıradaki tek kesin adımı taşır.
- Context küçülmesi veya yeni sohbete geçiş öncesi repository, solution/project graph, Git durumu ve yaşayan belgeler karşılaştırılır.
- Belgeler gerideyse yeni kaynak kod adımı verilmez; önce proje hafızası düzeltilir.
