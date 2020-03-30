import React from 'react'

const StatsSummary = (props) => (
  <div className="statsSummary componentSpacing">
    <div className="statsSummary-title">
      Summary
    </div>
    <ul className="statsSummary-list">
      <li className="statsSummary-item">
        <strong>
          {props.globalData.mostRecovered[0].country}
        </strong>
          has the highest amount of recovered patients <span className="highlighted">({props.globalData.mostRecovered[0].recoveredPercent.toFixed()}%)</span>
        , followed by
        <strong>
          {props.globalData.mostRecovered[1].country}
        </strong>
        <span className="highlighted">
          ({props.globalData.mostRecovered[1].recoveredPercent.toFixed()}%)
        </span>
          and
        <strong>
          {props.globalData.mostRecovered[2].country}
        </strong>
        <span className="highlighted">
          ({props.globalData.mostRecovered[2].recoveredPercent.toFixed()}%)
        </span>
      </li>
        { props.globalData.noDeaths &&
          <li className="statsSummary-item">
            {props.globalData.noDeaths.map((item, index) => <span className="highlighted" key={index}>{item.country}{index === 0 && props.globalData.noDeaths.length === 2 && " and "}{index === 0 && props.globalData.noDeaths.length > 2 && ", "} {index === 1 && props.globalData.noDeaths.length > 2 && " and "}</span>).slice(0, 3)}
            {props.globalData.noDeaths.length > 3 && "are some of the countries that"} has had <strong>multiple days</strong> without any reported deaths.
        </li>
        }
      <li className="statsSummary-item">
        In <span className="highlighted">
          {props.globalData.criticalLessThanFive.toFixed()}%
        </span>
          of the countries with active cases, <span className="highlighted">less than 5% of them are critical.</span>*
      </li>
    </ul>
    <div className="listNotice">
      *Based on countries with at least 1000 reported cases
    </div>
  </div>
)

export default StatsSummary
