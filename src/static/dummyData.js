const getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (Number(max) - Number(min) + 2));
};

const dummyTweets = [
  {
    id: 1,
    username: 'Alice',
    picture: 'https://randomuser.me/api/portraits/women/1.jpg', 
    content:
      '모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 모든 국민은 종교의 자유를 가진다. 국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을 보장한다. 모든 국민은 양심의 자유를 가진다. 누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다.',
    createdAt: '2025-02-24T16:17:47.000Z',
    updatedAt: '2025-02-24T16:17:47.000Z',
  },
  {
    id: 2,
    username: 'Bob', // <-- 이곳을 다시 한번 정확히 'Bob'으로 확인 (공백 제거)
    picture: 'https://randomuser.me/api/portraits/men/98.jpg',
    content:
      '형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다. 모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다.',
    createdAt: '2025-02-25T16:17:47.000Z',
    updatedAt: '2025-02-25T16:17:47.000Z',
  },
  {
    id: 3,
    username: 'leedesign',
    picture: 'https://randomuser.me/api/portraits/women/2.jpg',
    content:
      '모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다. 모든 국민은 양심의 자유를 가진다. 모든 국민은 사생활의 비밀과 자유를 침해받지 아니한다. 연소자의 근로는 특별한 보호를 받는다. 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.',
    createdAt: '2025-02-26T16:17:47.000Z',
    updatedAt: '2025-02-26T16:17:47.000Z',
  },
  {
    id: 4,
    username: 'songfront',
    picture: 'https://randomuser.me/api/portraits/men/3.jpg',
    content:
      '형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다. 모든 국민은 고문을 받지 아니하며, 형사상 자기에게 불리한 진술을 강요당하지 아니한다. 누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다.',
    createdAt: '2025-02-27T16:17:47.000Z',
    updatedAt: '2025-02-27T16:17:47.000Z',
  },
  {
    id: 5,
    username: 'choiback',
    picture: 'https://randomuser.me/api/portraits/women/4.jpg',
    content:
      '주거에 대한 압수나 수색을 할 때에는 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야 한다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 여자의 근로는 특별한 보호를 받으며, 고용·임금 및 근로조건에 있어서 부당한 차별을 받지 아니한다. 모든 국민은 주거의 자유를 침해받지 아니한다.',
    createdAt: '2025-02-28T16:17:47.000Z',
    updatedAt: '2025-02-28T16:17:47.000Z',
  },
];

export default dummyTweets;