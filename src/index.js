
/**********************1*********************/




const data = [
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: "3", label: "Three" },
];

const values = data.reduce((values, { value }) => {
  values.push(value);
  return values;
}, []);



/**********************2*********************/


async function getIndexes() {
  return await fetch('https://api.coingecko.com/api/v3/indexes').then(res => res.json());
}

async function analyzeIndexes() {
  const indexes = await getIndexes().catch(_ => {
    throw new Error('Unable to fetch indexes');
  });
  return indexes;
}



/**********************3*********************/



let state;
const user = getUser();
if (user) {
  const project = getProject(user.id);
  state = {
    user,
    project
  };
} else {
  state = {
    user: null,
    project: null
  };
}
ctx.body = state;



/**********************4*********************/



function getQueryProvider() {
  const url = window.location.href;
  const [_, provider] = url.match(/provider=([^&]*)/);
  if (provider) {
    return provider;
  }
  return;
}



/*********************5**********************/




function getParagraphTexts() {
  const texts = [];
  document.querySelectorAll("p").forEach(p => {
    texts.push(p);
  });
  return texts;
}




/********************6***********************/



function Employee({ id }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    getEmployee(id)
      .then(employee => {
        setEmployee(employee);
        setLoading(false);
      })
      .catch(_ => {
        setError('Unable to fetch employee');
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Table>
    <Row>
    <Cell>{employee.firstName}</Cell>
    <Cell>{employee.lastName}</Cell>
    <Cell>{employee.position}</Cell>
    <Cell>{employee.project}</Cell>
    <Cell>{employee.salary}</Cell>
    <Cell>{employee.yearHired}</Cell>
    <Cell>{employee.wololo}</Cell>
    </Row>
    </Table>
);
}


/*******************7************************/



async function getFilledIndexes() {
  try {
    const filledIndexes = [];
    const indexes = await getIndexes();
    const status = await getStatus();
    const usersId = await getUsersId();

    for (let index of indexes) {
      if (index.status === status.filled && usersId.includes(index.userId)) {
        filledIndexes.push(index);
      }
    }
    return filledIndexes;
  } catch(_) {
    throw new Error ('Unable to get indexes');
  }
}





/*********************8**********************/





function getUserSettings(user) {
  if (user) {
    const project = getProject(user.id);
    if (project) {
      const settings = getSettings(project.id);
      if (settings) {
        return settings;
      }
    }
  }
  return {};
}