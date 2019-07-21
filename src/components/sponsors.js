import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import { Row, Col, Typography } from "antd"
const { Title } = Typography

const Wrapper = styled.div`
  width: 100%;
  margin-top: auto;
  color: lightgray;
  padding: 1rem;
  text-align: center;
`

export default () => (
  <StaticQuery
    query={sponsorList}
    render={({ allMarkdownRemark: { edges: sponsors } }) => {
      return (
        <>
          <Wrapper>
            <Title level={3} style={{ color: "gray" }}>
              Sponsors
            </Title>
            <Row gutter={16} type="flex">
              {sponsors.map(({ node: { frontmatter } }, index) => (
                <Col
                  span={12}
                  sm={8}
                  md={4}
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                  key={index}
                >
                  <Img fluid={frontmatter.logo.childImageSharp.fluid} />
                </Col>
              ))}
            </Row>
          </Wrapper>
        </>
      )
    }}
  />
)

const sponsorList = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/sponsors/" } }
      sort: { fields: [frontmatter___name], order: DESC }
    ) {
      edges {
        node {
          html
          frontmatter {
            name
            logo {
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
