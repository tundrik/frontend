import { LineIcon } from "@/svg"
import { phone_site, email_site, office_site } from "../../../constant"
import { Star } from "../../../shared/svg"
import { setModalForm } from "../../features"

const ButtonAction = () => (
    <button className="acti" onClick={() => setModalForm({})}>
        <LineIcon />
        <span className="cs uperline">ОСТАВИТЬ ЗАЯВКУ</span>
    </button>
)

export const HomePage = () => (
    <main>
        <section className="gradient">
            <div className="content">
                <div className="image-cover">
                    <img className="cover" src="/images/1-3.jpeg" />
                    <div className="lavres">
                        <img className="lavr" src="/images/lavre.png" />
                        <div className="award">
                            <span className="aww">САМОЕ</span>
                            <span className="aww otve">ОТВЕТСТВЕННОЕ</span>
                            <span className="aww">Агентство</span>
                            <span className="aww">в Сочи</span>
                            <span className="god">2022</span>
                        </div>
                    </div>
                    <div className="cover-home">
                        <h1 className="cs hm">
                            <div className="h1-1">Агентство</div>
                            <div className="h1-2">Для тех кто ищет</div>
                            <div className="h1-3">новое качество жизни</div>
                        </h1>
                    </div>
                </div>

                <div className="cover-footer">
                    <div className="footer-item">
                        <p className="mrr">{office_site}</p>
                        <a className="line" target="_blank" href="https://goo.gl/maps/Vpjmc2tiTsmjVDfU6">
                            Смотреть на карте
                        </a>
                    </div>
                    <div className="footer-item">
                        <a className="line mrr" href={`tel:${phone_site}`}>
                            {phone_site}
                        </a>
                        <a className="line" href={`mailto:${email_site}`}>
                            {email_site}
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section className="one">
            <div className="content">
                <div className="about">
                    <h2 className="ck">
                        Представляем новый
                        <br />
                        сервис по продаже недвижимости
                    </h2>

                    <div className="abb mrb-20">
                        Быть отличным агентом — это знать местность, недвижимость и людей, которые здесь живут и
                        работают.
                    </div>
                    <div className="abb">
                        Мы держим свое слово. Недвижимость обычно является важным решением для людей, поэтому мы
                        стараемся быть прямыми и прямолинейными, а также оптимистичными и полезными. Мы общительная
                        компания, и у нас есть огромное количество энергии для того, что мы делаем.
                    </div>
                </div>
            </div>
        </section>

        <section className="one">
            <div className="content">
                <div className="about">
                    <h2 className="ck">Для покупателей</h2>

                    <div className="book mrb-40">
                        <div className="opium ttl">Получайте предложения первыми</div>
                        <div className="pereplet"></div>

                        <div className="opium">
                            Когда вы становитесь нашим клиентом, Вы получаете доступ к самым выгодным предложениям перед
                            их публикацией на открытый рынок.
                        </div>
                    </div>

                    <div className="book mrb-40">
                        <div className="opium ttl">Делегируйте постоянный мониторинг рынка</div>
                        <div className="pereplet"></div>

                        <div className="opium">
                            Мы используем автоматизацию совместно с ручным контролем чтобы не пропустить подходящие
                            предложения для вас.
                        </div>
                    </div>

                    <div className="book">
                        <div className="opium ttl">Обезопасьте себя от неожиданностей</div>
                        <div className="pereplet"></div>

                        <div className="opium">
                            Мы сможем с первого взгляда распознать уловки, которыми пользуются продавцы, чтобы скрыть
                            недостатки, найдем подход к соседям, чтобы выяснить причину продажи.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="one">
            <div className="content">
                <div className="about">
                    <h2 className="ck">Для продавцов</h2>

                    <div className="book mrb-40">
                        <div className="opium ttl">Получите потенциальных клиентов сразу</div>
                        <div className="pereplet"></div>

                        <div className="opium">
                            Когда вы выставляете свою недвижимость на продажу у нас, вы получаете доступ к нашей сети
                            состоятельных клиентов. Может быть у нас уже есть покупатель на ваш объект.
                        </div>
                    </div>

                    <div className="book mrb-40">
                        <div className="opium ttl">Получите максимальный охват</div>
                        <div className="pereplet"></div>

                        <div className="opium">
                            Мы не делаем вещи наполовину. Мы представлены на всех ведущих порталах по поиску
                            недвижимости: Avito, Cian, Yandex и т.д.
                        </div>
                    </div>

                    <div className="book">
                        <div className="opium ttl">Освободите себя от постоянных звонков</div>
                        <div className="pereplet"></div>

                        <div className="opium">Принимаем звонки, и организуем показы в удобное время</div>
                    </div>
                </div>
            </div>
        </section>

        <section className="gradient">
            <img className="cover" src="/images/Snapshot.png" />
            <div className="content">
                <div className="container--border">
                    <div className="star">
                        <Star />
                    </div>
                    <div className="wrap">
                        <span className="grad">Преследуем</span>
                        <span className="grad">ваши</span>
                    </div>
                    <div className="wrap">
                        <span className="grad">интересы</span>
                        <span className="grad">на </span>
                        <span className="grad">рынке</span>
                        <span className="grad">недвижимости.</span>
                    </div>
                    <div className="word">Стремясь к долгосрочным отношениям, дорожим репутацией.</div>

                    <div className="book jc">
                        <div className="opium pol">
                            <ButtonAction />
                        </div>
                        <div className="pereplet mobile-none"></div>

                        <div className="opium pol f14 mobile-none">
                            <div className="mrb-50">
                                <div className="title_line">К нам в гости</div>
                                <p className="">{office_site}</p>
                                <a className="line" target="_blank" href="https://goo.gl/maps/Vpjmc2tiTsmjVDfU6">
                                    Смотреть на карте
                                </a>
                            </div>
                            <div className="title_line">Хотите поговорить?</div>
                            <a className="line mrr" href={`tel:${phone_site}`}>
                                {phone_site}
                            </a>
                            <a className="line" href={`mailto:${email_site}`}>
                                {email_site}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="copi">
                    <div className="row">
                        TM & Copyright 2022. <span className="mobile-none"> Все права защищены.</span>
                    </div>
                    <div className="mobile-none">Политика конфиденциальности</div>
                </div>
            </div>
        </section>
    </main>
)

