import {
  KPage,
  KSite,
  KHeader,
  KCardBody,
  KCard,
  KCardHeader,
  KCardFloater,
  KCardTitle,
  KCardFooter,
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
  KTableWrapper,
  KForm,
  KInput,
  KFooter,
  KContainer,
} from "./k-site";
import { useState } from "react";

function App() {
  const [people, setPeople] = useState([
    {
      firstName: "John",
      lastName: "Smith",
      occupancy: "Developer",
      age: "20",
    },
  ]);
  const [theme, setTheme] = useState("default");

  const onAdd = (e) => {
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
    <KSite currentTheme={theme}>
      <KNavbarUncontrolled
        brand="k-site"
        color="text"
        fixed
        expand="md"
        bg="transparent"
        py="1"
        scrolledProps={{ color: "body", bg: "text", elevate: 2, py: "0.8" }}
      />
      <KPage name="Home" route="/">
        <KHero
          gradient={{ colors: ["green-600", "teal-400"], deg: 45 }}
          color="contrast"
          size="medium"
          text="center">
          <KHeroBody px="0.5">
            <KContainer>
              <KAnimation anim={["fadeIn 0.5s ease", "up 0.5s ease"]}>
                <h1 className="display-1">Welcome to k-site.</h1>
                <h2>Lorem Ipsum is simply dummy text.</h2>
              </KAnimation>
            </KContainer>
          </KHeroBody>
        </KHero>
        <KSection name="About" route="/#about" navbar>
          <KContainer>
            <KAnimation anim={["fadeIn 0.5s ease", "up 0.5s ease"]}>
              <h1 className="text-center"> About us !</h1>
              <p className="text-justify">
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
              </p>
            </KAnimation>
          </KContainer>
        </KSection>
        <KSection name="Form" route="/#form" navbar>
          <KContainer>
            <KRow>
              <KCol md="6">
                <KCard maxHeight={"250px"}>
                  <KTableWrapper>
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
                  </KTableWrapper>
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
                <p className="text-justify">
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
                </p>
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
  const imgs = [];
  for (let i = 0; i < count; i++) {
    let a = Math.floor(Math.random() * 5000);
    imgs.push({
      src:
        "https://picsum.photos/seed/" +
        a +
        sizes[Math.floor(Math.random() * sizes.length)],
      description: "img " + a,
      tags: ["tag"],
    });
  }
  return imgs;
};

export default App;
