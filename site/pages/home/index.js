import { DawIcon } from "@/svg"
import { setModalForm } from "../../features"
import { phone_site, email_site, office_site } from "../../../constant"

export const HomePage = () => (
    <>
        <section className="home">
            <img className="image-1" src="/images/home3.jpg" />
            <div className="action">
                <div className="sheet">
                    <div className="cell-2 pd-20">
                        <h4 className="mrt-30">Агентство недвижимости в сочи</h4>
                        <h2 className="mrt-20">Получите преимущество</h2>
                        <div className="line-1" />
                        <p className="mr-2-0">
                            Не упустите свой лучший вариант. Самые выгодные предложения не успевают попасть на открытый
                            рынок. Мы днем и ночью выискиваем новые предложения для наших клиентов.
                        </p>
                        <button className="b-action" onClick={() => setModalForm({})}>
                            Получать предложения
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section className="light">
            <div className="sheet sheet-2 row">
                <div className="cell-2 jc pd-20">
                    <h4 className="mrt-30 grey">О нас</h4>
                    <h2 className="mrt-20">Мы - решение</h2>
                    <div className="line-1 burder-gray" />
                </div>
                <div className="cell-2 jc pd-20">
                    <p className="mr-2-0">
                        Liberty фокусируется на потребностях и желаниях наших клиентов. Имея полную команду, мы можем
                        провести вас через весь процесс, от предварительного ознакомления с рынком недвижимости до
                        приобретения. Если вы ищете 100% надежность, нельзя отрицать положительные факты нашего сервиса.
                    </p>
                </div>
            </div>
        </section>

        <section className="dark">
            <div className="sheet">
                <div className="row mr-1">
                    <div className="cell-2">
                        <div className="f1 picture">
                            <img className="image-cover" src="/images/photo6.jpg" />
                        </div>
                    </div>
                    <div className="cell-2">
                        <div className="pd-20">
                            <h4 className="mrt-20 white-2">О нас</h4>
                            <h2 className="mrt-20">Обзор компании</h2>
                            <p className="mrt-20">
                                Liberty тесно сотрудничает с нашими застройщиками, банками и собственниками, чтобы найти
                                эффективное решение, которое решит цели клиента. Это помогает нам выполнять работу
                                качественно. От начала до конца наша команда демонстрирует полный контроль для успешного
                                выполнения поставленной цели.
                            </p>
                            <div className="line-1" />
                            <h4 className="mrt-20 white-2">ЗАЯВЛЕНИЕ О МИССИИ</h4>
                            <p className="mrt-20">
                                Чтобы создать долгосрочные отношения, предоставляя решения, которые приводят к
                                исключительным результатам.
                            </p>
                            <h4 className="mrt-20 white-2">НАШИ ВЗГЛЯДЫ</h4>
                            <p className="mr-2-0">
                                Лидировать в сфере жилой и коммерческой недвижимости с превосходством, выдающейся
                                репутацией и создавать долгосрочные и прочные партнерские отношения.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="light-gray">
            <div className="sheet sheet-3 row">
                <div className="cell-2 jc pd-20">
                    <h4 className="mrt-30 white-2">ОТ НАЧАЛА И ДО КОНЦА</h4>
                    <h2 className="mrt-20">Ценности клиента</h2>
                    <div className="line-1" />
                </div>
                <div className="cell-2 jc pd-20">
                    <p className="mr-2-0">
                        Конечной целью для каждого клиента, с которым мы сталкиваемся, является ценность и максимальная
                        отдача от его инвестиций. Качество объекта и сроки являются ключевыми факторами, определяющими
                        эту ценность. Мы любим, чтобы наши клиенты были счастливы. Мы не любим катастроф.
                    </p>
                </div>
            </div>
        </section>

        <section className="light">
            <div className="sheet">
                <div className="row mr-1">
                    <div className="cell-2">
                        <div className="f1 gutter-15 picture-2">
                            <img className="image-cover" src="/images/photo4.jpg" />
                        </div>
                    </div>
                    <div className="cell-2">
                        <div className="gutter-15 pd-16">
                            <div className="icon-1">
                                <DawIcon />
                            </div>
                            <h5 className="text-4">ОБЕСПЕЧИВАЕМ ВАШЕ СПОКОЙСТВИЕ</h5>
                            <p className="p-4">
                                Поиск и приобретение недвижимости тесно связан со стрессом у людей, мы берем все
                                проблемы на себя.
                            </p>
                        </div>
                        <div className="gutter-15 pd-16">
                            <div className="icon-1">
                                <DawIcon />
                            </div>
                            <h5 className="text-4">ВЫБОР</h5>
                            <p className="p-4">
                                Лучшее решение требует охвата предложений по всему рынку что требует большое количество
                                время, переложите это на нас.
                            </p>
                        </div>
                        <div className="gutter-15 pd-16">
                            <div className="icon-1">
                                <DawIcon />
                            </div>
                            <h5 className="text-4">БЕЗОПАСНОСТЬ</h5>
                            <p className="p-4">
                                Приобретение недвижимости накладывает юридические риски, позвольте нашим юристам
                                выполнять свою работу.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="dark">
            <div className="sheet">
                <div className="row mr-2">
                    <div className="cell-2">
                        <div className="pd-20">
                            <h4 className="mrt-35 white-2">Гарантированно</h4>
                            <h2 className="mrt-20">100% Удовлетворение</h2>
                            <ul className="indent">
                                <li>
                                    Встречаем клиентов в аэропорту, помогаем с размещением на время поиска подходящего
                                    варианта.
                                </li>
                                <li>Устраиваем ознакомительные поездки по комплексам и улицам города.</li>
                                <li>Лучшее обслуживание клиентов, без шуток!</li>
                                <li>24/7 доступны. Обращайтесь к нам в любое время</li>
                            </ul>
                        </div>
                    </div>
                    <div className="cell-2">
                        <div className="f1 picture">
                            <img className="image-cover" src="/images/photo5.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="light-gray">
            <div className="sheet sheet-3 row">
                <div className="cell-2 jc pd-20">
                    <h4 className="mrt-30 white-2">В ГОСТИ К НАМ</h4>
                    <h2 className="mrt-20">Контакты</h2>
                    <div className="line-1" />
                </div>
                <div className="cell-2 jc pd-20">
                    <p className="mrt-30">
                        <b>Адрес:</b> Сочи {office_site}
                        <br />
                        <b>Телефон:</b> {phone_site}
                        <br />
                        <b>Почта:</b> {email_site}
                        <br />
                    </p>
                    <p className="mr-2-0">
                        В качестве альтернативы вы можете отправить нам запрос, используя контактную форму ниже. Просто
                        заполните форму, и мы свяжемся с вами как можно скорее.
                    </p>
                    <button className="w-action" onClick={() => setModalForm({})}>
                        Отправить запрос
                    </button>
                    <p className="mrt-30"></p>
                    <p className="mrt-30"></p>
                  
                </div>
            </div>
        </section>
    </>
)

