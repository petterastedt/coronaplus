import React from 'react'

const StatsSummary = ({globalData, threshold}) => (
    <div className="statsSummary componentSpacing">
      <div className="statsSummary-title">
        Summary
      </div>
      <ul className="statsSummary-list">
        { globalData.totallyRecovered.length !== 0 &&
          <li className="statsSummary-item">
            { globalData.totallyRecovered
              .map((item, index) => <span className="highlighted" key={index}>{item.country}{index === 0 && globalData.totallyRecovered.length === 2 && " and "}{index < globalData.totallyRecovered.length-2 && ", "}{index === globalData.totallyRecovered.length-2 && " and "}</span>)
            }
            have reported <strong>full recovery</strong> from the Corona virus! <span role="img" aria-label="elebration emoji">🎉</span>
          </li>
        }

        { Math.abs(globalData.recoveredPercent - globalData.recoveredPercentYesterday) > 0.5 &&
          <li className="statsSummary-item">
            Worldwide recovery is up <span className="highlighted">+{Math.round(Math.abs(globalData.recoveredPercent - globalData.recoveredPercentYesterday)).toFixed(2)}%</span> since yesterday!
          </li>
        }

        <li className="statsSummary-item">
          <strong className="country highlighted">
            {globalData.mostRecovered[0].country}
          </strong>
            has the highest amount of recovered patients <span className="highlighted">({globalData.mostRecovered[0].recoveredPercent.toFixed()}%)</span>
            , followed by <strong className="country highlighted">{globalData.mostRecovered[1].country}</strong>
          <span className="highlighted">
            ({globalData.mostRecovered[1].recoveredPercent.toFixed()}%)
          </span> and <strong className="country highlighted"> {globalData.mostRecovered[2].country}</strong>
          <span className="highlighted">
            ({globalData.mostRecovered[2].recoveredPercent.toFixed()}%)
          </span>
        </li>

          { globalData.noDeaths.length > 0 &&
            <li className="statsSummary-item">
              {globalData.noDeaths
                .map((item, index) => <span className="highlighted" key={index}>{item.country}{index === 0 && globalData.noDeaths.length === 2 && " and "}{index === 0 && globalData.noDeaths.length > 2 && ", "} {index === 1 && globalData.noDeaths.length > 2 && " and "}</span>)
                .slice(0, 3)}
              {globalData.noDeaths.length > 3 && "are some of the countries that"} have had <strong>multiple days</strong> without any reported deaths.
            </li>
          }

        <li className="statsSummary-item">
          In <span className="highlighted">
            {globalData.criticalLessThanFive.toFixed()}%
          </span>
            of the countries with active cases, <span className="highlighted">less than 5% of them are critical.</span>*
        </li>

        { globalData.recoveredMostDifference.country &&
          <li className="statsSummary-item">
            <strong className="country highlighted">
              {globalData.recoveredMostDifference.country}
            </strong>
            has the highest increase in recoveries from the past day with <span className="highlighted">+{globalData.recoveredMostDifference.recoveredDifference.toFixed()}%</span>*
          </li>
        }

      </ul>
      <div className="listNotice">
        *Based on countries with at least {threshold} reported cases
      </div>
    </div>
  )

export default StatsSummary
