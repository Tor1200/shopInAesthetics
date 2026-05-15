const titles = ["Store!", "Buy!", "Prices!", "Shopping!"];

let a = new Audio("./kordz - STRANGE.mp3");
a.loop = true;
let isFetching = false; //added to not fetch json while json was being fetched

onload = () => {
  setInterval(() => {
    let tndex;
    do {
      tndex = Math.floor(Math.random() * titles.length);
    } while (titles[tndex] === document.querySelector("title").textContent);
    document.querySelector("title").textContent =
      titles[Math.floor(Math.random() * 4)];
  }, 2000);
};

const ls = [];

if (!isFetching) {
  isFetching = true;
  fetch("https://fakestoreapi.com/products")
    .then((resp) => {
      return resp.json();
    })
    .then((res) => {
      isFetching = false;
      console.log(res);
      //process data here
      res.forEach((val) => {
        ls.push(document.createElement("a"));
        ls[ls.length - 1].classList.add("green"); //მიანიჭე კლასი ასე
        ls[ls.length - 1].textContent = `${val.title}, `;
        ls[ls.length - 1].href = `javascript:view(${ls.length - 1})`;
        document
          .getElementsByClassName("links")[0]
          .appendChild(ls[ls.length - 1]);
      });
      //append: ჩაყრის ელემენტების სიას
      //appendChild: ჩაყრის ერთ ელემენტს
      //ოპერაციები აქ უნდა მოხდეს, რადგან გარეთ ჯერ ობიექტი ცარიელია, სადგან async-ია
    });
}

const view = (ndex) => {
  if (!isFetching) {
    a.play();
    document.querySelector("main").textContent = "";
    isFetching = true;
    fetch("https://fakestoreapi.com/products")
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        isFetching = false;
        let a = document.createElement("img");
        a.src = res[ndex].image;
        document.querySelector("main").appendChild(a);
        for (let i in res[ndex]) {
          if (i !== "image" && i !== "id" && i !== "rating") {
            const a = document.createElement("h2");
            a.textContent += `${i}: ${res[ndex][i]}`;
            if (i === "price") a.textContent += `$`;
            document.querySelector("main").appendChild(a);
          } else if (i === "rating") {
            const a = document.createElement("h2");
            a.textContent += `${i}: ${res[ndex][i].rate} (${res[ndex][i].count})`;
            document.querySelector("main").appendChild(a);
          }
        }
        a = document.createElement("a");
        a.textContent = "Buy";
        a.href = "https://example.com";
        a.target = "_blank";
        document.querySelector("main").appendChild(a);
      });
  }
};

/*
hone.style.cssText = `
  color: green;
  background-color: yellow;
`;

const im = document.createElement("img");
fetch(
  "https://www.notion.so/image/https%3A%2F%2Fcdn.discordapp.com%2Fsplashes%2F532716423982612480%2F818c2335fdb00bad9ba74e6d8fa1a359.jpg",
)
  .then((resp) => resp.blob())
  .then((ans) => {
    im.src = new FileReader().readAsDataURL(ans);
  });
document.querySelector("main").appendChild(im);
*/
