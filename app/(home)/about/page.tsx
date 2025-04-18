import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      {/* Hero Bölməsi */}
      <section
        className="w-full py-12 md:py-24 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/20 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div
              className="inline-block rounded-lg bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-sm text-orange-800 dark:text-orange-300">
              Haqqımızda
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Cruyffism Haqqında</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Cruyffism ilə – Johan Cruyff'un irsinə və Total Futbol fəlsəfəsinə həsr olunmuş bloqumuzla tanış olun.
            </p>
          </div>
        </div>
      </section>

      {/* Cruyffism Haqqında */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Cruyffism Haqqında</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cruyffism, Johan Cruyff-un taktiki dahiliyini, fəlsəfi yanaşmasını və davamlı irsini araşdırmaq və
                  qeyd
                  etmək üçün yaradılmış bir bloqdur. 2020-ci ildə bir qrup futbol həvəskarı və taktiki analitik
                  tərəfindən
                  qurulan bu layihənin məqsədi futbolda inqilab edən prinsipləri qorumaq və yaymaqdır.
                </p>
                <p>
                  Biz inanırıq ki, Cruyff-un təsiri onun oyunçu və məşqçi kimi karyerasından daha uzağa gedir. Onun
                  məkan,
                  mövqe və futbolda intellektin rolu haqqında düşüncələri bu gün də müasir oyunu formalaşdırır. Ətraflı
                  məqalələr, taktiki təhlillər və tarixi baxışlarla biz oyunu daha dərindən başa düşmək istəyən hər kəs
                  üçün
                  əhatəli bir mənbə təqdim etməyə çalışırıq.
                </p>
                <p>
                  Komandamız yazıçılar, analitiklər və keçmiş futbolçulardan ibarətdir. Onların hamısı futbola qarşı
                  eyni
                  ehtirası və Cruyff-un töhfələrinə dərin rəğbəti bölüşür. Məqsədimiz mürəkkəb taktiki anlayışları hər
                  kəs
                  üçün əlçatan etməkdir, analitik dəqiqlik və tarixi düzgünlüyü qoruyaraq.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Cruyffism Bloq Komandası"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Johan Cruyff Haqqında */}
      <section className="w-full py-12 md:py-24 bg-orange-100 dark:bg-orange-900/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Johan Cruyff"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Johan Cruyff Haqqında</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hendrik Johannes Cruijff, bütün dünyada Johan Cruyff kimi tanınırdı. O, 25 aprel 1947-ci ildə
                  Amsterdamda
                  anadan olub. Futbol tarixində ən böyük oyunçulardan biri və müasir futbolun inkişafında ən təsirli
                  şəxslərdən biri hesab olunur.
                </p>
                <p>
                  Oyunçu kimi Cruyff, 1970-ci illərdə oyunu inqilabi şəkildə dəyişən Total Futbol sisteminin canlı
                  siması
                  idi. O, Ajax-ı 1971–1973-cü illər arasında ardıcıl üç dəfə Avropa Kubokunu qazanmağa apardı və 1974
                  Dünya
                  Çempionatında Niderlandın möhtəşəm çıxışının əsas simasına çevrildi. Onun texniki bacarığı, baxışı və
                  oyun düşüncəsi onu fərqləndirdi və ona üç dəfə Ballon d'Or qazandırdı.
                </p>
                <p>
                  Karyerasını başa vurduqdan sonra Cruyff məşqçi kimi daha da böyük təsir göstərdi. Barcelona-da o,
                  toplaşma, mövqe oyunu və hücum futboluna əsaslanan klubun bənzərsiz oyun tərzinin əsaslarını qoydu.
                  Onun
                  Barcelona-dakı irsi yalnız taktiki deyil, həm də dünyanın ən yaxşı futbolçularından bəzilərini
                  yetişdirən
                  La Masia akademiyasının qurulması ilə də bağlıdır.
                </p>
                <p>
                  Cruyff-un fəlsəfəsi futboldan da uzağa gedirdi. Onun məşhur sitatları həm oyun, həm də həyat haqqında
                  özünəməxsus baxış bucağını əks etdirirdi. O, 24 mart 2016-cı ildə vəfat etsə də, onun ideyaları bu gün
                  də
                  futbolun hər səviyyəsində — həm peşəkar, həm də həvəskar — təsir göstərməyə davam edir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
