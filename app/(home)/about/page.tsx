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
                  <strong>Cruyffism</strong> adını futbol tarixinə öz damğasını vurmuş <strong>Johan Cruyff</strong>'dan
                  alan şəxsi bir futbol bloqudur.
                  Bu bloq Cruyff'un futbol fəlsəfəsindən — sadəliyin dahiliyindən, azad düşüncənin gücündən və oyunun
                  gözəlliyinə olan sonsuz sevgisindən ilhamlanaraq yaradılıb.
                </p>
                <p>
                  Burada yer alan yazılar bir futbolsevərin oyuna olan baxışını, analizlərini və şəxsi rəylərini əks
                  etdirir. Məqsəd sadəcə nəticələrə fokuslanmaq deyil, meydandakı anlayışı, taktiki yanaşmaları və
                  futbola ruh verən detalları dərk edib, oxucularla bölüşməkdir.
                </p>
                <p>
                  Cruyffism futbola təkcə bir oyun kimi deyil, düşüncə tərzi kimi yanaşan bir baxışın məhsuludur.
                  Buradakı hər bir sətir oyunu daha dərindən anlamaq və bu anlayışı yazı dili ilə ifadə etmək istəyinin
                  səmimi nəticəsidir.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://bymsbrand.com/cdn/shop/articles/BYMS_Soccer_The_Cruyffism_by_Johan_Cruyff2_2f5ec8ac-edcc-4891-874b-5044c417ab44.jpg?v=1741105079&width=1143"
                alt="cruyffism"
                fill
                className="object-cover"
                unoptimized
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
                src="https://static01.nyt.com/images/2016/03/25/sports/25CRUYFFweb1/25CRUYFFweb1-superJumbo.jpg"
                alt="Johan Cruyff"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Johan Cruyff Haqqında</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Johan Cruyff, yalnız bir futbolçu və ya məşqçi deyildi. O, futbolun öz dili, öz düşüncə tərzi olan bir
                  sənət formasına çevrilə biləcəyini sübut edən bir vizioner idi. Meydanda hər toxunuşu ilə sanki oyunla
                  dialoqa girər, sadəliyin içindəki dərinliyi göstərərdi. Onun üçün futbol sadəcə qol vurmaq yox, oyunu
                  anlamaq və oyunun gözəlliyini paylaşmaq idi.
                </p>
                <p>
                  1970-ci illərin Ajax'ı və Niderland yığması ilə Cruyff, <strong>Total Futbol</strong> anlayışının
                  canlı təcəssümünə
                  çevrildi. O, sərhədləri olmayan bir oyunçu idi – hücumçu kimi başlayar, lazım gələrsə müdafiəyə qədər
                  çəkilərdi. Hər mövqedə düşünə bilən, hər vəziyyətdə yarada bilən bir futbolçu idi. Məşqçilik dövrü də
                  futbolçuluğndan geri qalmayan Cruyff həm Ajax, həm də Barcelona ilə uğurlara imza atmaqla yanaşı, bu
                  klubların genetikasına da toxundu.
                </p>
                <p>
                  Cruyff'un sözləri oyunu izah etməklə kifayətlənməz, onu yenidən düşünməyə vadar edərdi: "Topa sahib
                  olmadığın zaman, yalnız bir şey edə bilərsən – onu geri almaq". Bu cümlə onun fəlsəfəsinin nüvəsidir.
                  Johan Cruyff'un həyatı futbolun necə oynanmalı olduğunu göstərən bir
                  dərs idi – və bu dərs hələ də davam edir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
