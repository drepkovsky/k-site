import {
  KPage,
  KSite,
  KCard,
  KIcon,
  KTable,
  KTableHead,
  KTableRow,
  KTableBody,
  KTableItem,
  KNavbarUncontrolled,
  KSection,
  KGallery,
  KButton,
  KHero,
  KHeroBody,
  KAnimation,
  KRow,
  KCol,
  KForm,
  KInput,
  KFooter,
  KContainer,
  Display1,
  Paragraph,
  H1,
  H2,
  KModalFooter,
  KModalHeader,
  KModal,
  KModalBody,
  Overlay,
  KDatePicker,
  KDropdownContent,
  KDropdownWrapper,
  KCardTitle,
  KCardHeader,
  KCardBody,
  KInputDate,
} from "./k-site";
import { useState } from "react";
import { DateUtils } from "react-day-picker";

function App() {
  const [people, setPeople] = useState([
    {
      firstName: "John",
      lastName: "Smith",
      occupancy: "Developer",
      age: "20",
    },
    {
      firstName: "Peter",
      lastName: "Wood",
      occupancy: "Worker",
      age: "35",
    },
  ]);
  const [theme, setTheme] = useState("default");
  const [isOpen, setOpen] = useState(false);
  const [isDrOpen, setDrOpen] = useState(true);

  const onAdd = (e) => {
    console.log(e);
    if (e) {
      const tmpPeople = people;
      tmpPeople.push({
        firstName: e.firstName,
        lastName: e.lastName,
        occupancy: e.occupancy,
        age: e.age,
      });
      setPeople([...tmpPeople]);
    }
  };

  const toggle = () => {
    setOpen(!isOpen);
  };

  const Switch = (props) => {
    return (
      <KButton
        className="mt-2"
        onClick={() =>
          setTheme(theme == "default" ? "default-dark" : "default")
        }
        py="0.5rem">
        Switch Theme
      </KButton>
    );
  };

  return (
    <KSite
      accentColor={"#1f1f1f"}
      optionalColors={{ primary: "#49aeee" }}
      currentTheme={theme}>
      <KNavbarUncontrolled
        brand="k-site"
        brandLink="/"
        position="fixed"
        expand="md"
        bg="transparent"
        py="1"
        color="white"
        scrolledProps={{
          color: "background",
          bg: "grey-10",
          elevate: 2,
          py: "0.8",
        }}
      />
      <KPage name="Home" route="/">
        <KHero
          color="grey-10"
          size="fullheight"
          text="center"
          bgImg="http://www.chatacerenka.sk/assets/images/cerenkastranka-1920x1080.jpg"
          bgPosition="50% 50%"
          bgRepeat="no-repeat"
          bgSize="cover">
          <KHeroBody px="0.5">
            <KContainer>
              <KAnimation anim={["fadeIn 0.5s ease", "up 0.5s ease"]}>
                <Display1 color="white">Welcome to k-site.</Display1>
                <H2>Lorem Ipsum is a dummy text.</H2>
              </KAnimation>
            </KContainer>
            <Overlay opacity={0.5} />
          </KHeroBody>
        </KHero>
        <KSection name="About" route="/#about" navbar>
          <KContainer>
            <KAnimation anim={["fadeIn 0.5s ease", "up 0.5s ease"]}>
              <H1 text="center"> About us !</H1>
              <Paragraph text="justify">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consectetur adipisci quos repellat assumenda magnam illum
                quaerat ratione odit, nihil, illo perferendis aperiam,
                asperiores unde architecto rerum. Consequatur ducimus autem
                molestias blanditiis in obcaecati rerum voluptate iste saepe
                labore nesciunt, nemo vero possimus vitae cupiditate beatae
                quidem. Velit impedit omnis at quisquam consequatur numquam, non
                iure deleniti totam ratione nulla, laborum ipsa suscipit
                sapiente eaque consectetur et! Aperiam quam quas praesentium ex
                suscipit nulla esse velit, quidem id iure consectetur, iusto vel
                quisquam odio exercitationem officia ut. Distinctio repellat
                tenetur, optio corrupti eos perferendis eveniet beatae deserunt,
                tempore inventore, facere aperiam.
              </Paragraph>
            </KAnimation>
          </KContainer>
        </KSection>
        <KSection name="Form" route="/#form" navbar>
          <KContainer>
            <KModal centered={true} isOpen={isOpen} toggle={toggle}>
              <KModalHeader>This is a modal.</KModalHeader>
              <KModalBody>This is body of a modal</KModalBody>
              <KModalFooter></KModalFooter>
            </KModal>
            <h1>Form</h1>
            <KRow py="2">
              <KCol md="6">
                <KCard maxH={"200px"} overflow="auto">
                  <KTable>
                    <KTableHead>
                      <KTableRow>
                        <KTableItem>#</KTableItem>
                        <KTableItem>FirstName</KTableItem>
                        <KTableItem>LastName</KTableItem>
                        <KTableItem>Age</KTableItem>
                        <KTableItem>Occupancy</KTableItem>
                      </KTableRow>
                    </KTableHead>
                    <KTableBody>
                      {people.map((person, index) => {
                        return (
                          <KTableRow key={index}>
                            <KTableItem>{index}</KTableItem>
                            <KTableItem>{person.firstName}</KTableItem>
                            <KTableItem>{person.lastName}</KTableItem>
                            <KTableItem>{person.age}</KTableItem>
                            <KTableItem>{person.occupancy}</KTableItem>
                          </KTableRow>
                        );
                      })}
                    </KTableBody>
                  </KTable>
                </KCard>
                <KCard mt="2">
                  <KCardHeader divider={false}>
                    <KCardTitle>Peter</KCardTitle>
                  </KCardHeader>
                  <KCardBody>body</KCardBody>
                </KCard>
              </KCol>
              <KCol md="6">
                <KForm onOutput={onAdd}>
                  <KRow>
                    <KCol md="6">
                      <KInput
                        label="First Name"
                        name="firstName"
                        placeholder="John"
                        type="text"
                        required
                      />
                    </KCol>
                    <KCol md="6">
                      <KInput
                        label="Last Name"
                        name="lastName"
                        placeholder="Smith"
                        type="text"
                        required
                      />
                    </KCol>
                    <KCol md="6">
                      <KInput
                        label="Age"
                        name="age"
                        placeholder="20"
                        type="number"
                        required
                        errorMessage="Age has to be even."
                        validation={(e) => {
                          return e % 2 == 0;
                        }}
                      />
                    </KCol>
                    <KCol md="6">
                      <KInput
                        label="Occupancy"
                        name="occupancy"
                        placeholder="worker"
                        type="text"
                        required
                      />
                    </KCol>
                    <KCol md="6">
                      <KInputDate label="Datum" name="date" />
                    </KCol>
                    <KCol md="6">
                      <KInputDate
                        isRangeSelect
                        label="Datum Range"
                        name="dateRange"
                        validation={(e) => {
                          if (e[0])
                            return DateUtils.isDayBefore(e[0], new Date());
                          return false;
                        }}
                        errorMessage="Najneskôr od 27.1"
                      />
                    </KCol>
                  </KRow>
                  <KButton type="submit">
                    Add <KIcon ml="1" prefix="fa" name="plus"></KIcon>
                  </KButton>
                </KForm>
              </KCol>
            </KRow>
          </KContainer>
        </KSection>
        <KSection
          customTheme={{ colors: { body: "#111", text: "#fff" } }}
          pt={3}>
          <KContainer>
            <KAnimation anim={["fadeIn 0.5s ease-in", "up 0.5s ease"]}>
              <KFooter>
                <h1>Footer</h1>
                <Paragraph display="">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Paragraph>
              </KFooter>
            </KAnimation>
          </KContainer>
        </KSection>
      </KPage>
      <KPage name="Gallery" route="/gallery" navbar>
        <KSection>
          <KContainer>
            <h1>Gallery</h1>
            <KGallery images={getRandomImages(50)} />
          </KContainer>
        </KSection>
      </KPage>
    </KSite>
  );
}

const getRandomImages = (count) => {
  const sizes = ["/1920/1080/", "/1080/1920/", "/2000/1500/", "/1500/1500/"];
  const thumbnail = "/400/300/";
  const imgs = [];
  for (let i = 0; i < count; i++) {
    let a = Math.floor(Math.random() * 5000);
    imgs.push({
      src:
        "https://picsum.photos/seed/" +
        a +
        sizes[Math.floor(Math.random() * sizes.length)],
      thumbnailSrc: "https://picsum.photos/seed/" + a + thumbnail,
      description: "img " + a,
      tags: ["tag"],
    });
  }
  return imgs;
};

export default App;
