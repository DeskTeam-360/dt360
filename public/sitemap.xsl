<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #444;
            background: #f4f6f8;
          }
          .wrap {
            max-width: 1100px;
            margin: 0 auto;
            padding: 24px;
          }
          h1 {
            margin: 0 0 12px;
            font-size: 28px;
            color: #11104c;
          }
          p {
            margin: 0 0 10px;
            line-height: 1.6;
          }
          a {
            color: #e3058d;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border: 1px solid #ddd;
            margin-top: 20px;
          }
          th, td {
            padding: 12px 14px;
            text-align: left;
            border-bottom: 1px solid #eee;
            font-size: 14px;
          }
          th {
            background: #6b7280;
            color: #fff;
            font-weight: 700;
          }
          tr:nth-child(even) td {
            background: #fafafa;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1>XML Sitemap</h1>
          <p>This XML Sitemap is generated for DeskTeam360 and is meant for consumption by search engines.</p>
          <p>You can find more information about XML sitemaps on <a href="https://www.sitemaps.org/">sitemaps.org</a>.</p>
          <p>This XML Sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)" /> URLs.</p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="sitemap:loc" />
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:loc" />
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod" />
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
